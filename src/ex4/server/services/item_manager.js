const {
  NOT_A_POKEMON,
  TASK_ALREADY_EXISTS,
  ERR_W_ADD_TO_DB,
  TASK_NOT_FOUND,
  ERR_W_GET_TASKS,
  TASK_REMOVED,
} = require("./globalConsts/GlobalConstants.js");
const fs = require("fs");
const PokemonClient = require("../clients/pokemon_client.js");
const path = require("path");
const { Item, sequelize } = require("../db/models");

class ItemManager {
  constructor() {
    this.pokedex = PokemonClient;
    this.tasksFile = "../db/tasks.json";
    this.cacheFile = "../db/pokemonsCache.json";
    this.tasks = [];
  }

  async addPokedexResposneToTasks(input, response, isFromCache, position) {
    const res = [];
    const t = await sequelize.transaction();
    if (!isFromCache) {
      this.saveResponseToCache(input, response);
    }

    try {
      for (const pokemon of response) {
        const item = await this.addTaskToFile(pokemon, false, position);
        if (item) {
          res.push(item);
        }
      }
      await t.commit();
      return res;
    } catch (err) {
      await t.rollback();
      return { error: err, message: ERR_W_ADD_TO_DB };
    }
  }

  getCache() {
    const cache = fs.readFileSync(path.join(__dirname, this.cacheFile));
    return JSON.parse(cache);
  }

  getResponseFromCache(input) {
    const cache = this.getCache();
    if (cache[input]) {
      return cache[input];
    }
    return null;
  }

  async getPokemonsToAdd(input) {
    const response = await this.pokedex.getPokemonsNamesAndTypes(input);
    if (response === NOT_A_POKEMON) {
      return { error: NOT_A_POKEMON, message: NOT_A_POKEMON };
    } else return response;
  }

  async addCatchPokemonTask(input, position) {
    let pokemonsToAdd = this.getResponseFromCache(input);
    if (!pokemonsToAdd) {
      pokemonsToAdd = await this.getPokemonsToAdd(input);
      if (pokemonsToAdd.error) {
        return pokemonsToAdd;
      }
      const addedTasks = await this.addPokedexResposneToTasks(
        input,
        pokemonsToAdd,
        true,
        position
      );
      return addedTasks;
    }
  }

  isInputSetOfPokemonIDs(input) {
    const regex = /^[0-9,]+$/;
    return regex.test(input);
  }

  isPokemonTask(taskInput) {
    return (
      this.isInputSetOfPokemonIDs(taskInput) ||
      this.pokedex.isPokemonNamesOnly(taskInput)
    );
  }

  async saveTaskToDB(task) {
    let item;
    try {
      item = await Item.create(task);
    } catch (err) {
      console.log(err);
      throw ERR_W_ADD_TO_DB;
    }
    this.tasks.push(item.dataValues);
    return item.dataValues;
  }

  async addTaskToFile(taskInput, isCompleted, position) {
    const isTaskExist = this.tasks.find((task) => task.itemName === taskInput);
    if (isTaskExist) {
      throw TASK_ALREADY_EXISTS;
    } else {
      const task = {
        itemName: taskInput,
        status: isCompleted,
        doneAt: null,
        position: position,
      };
      try {
        return await this.saveTaskToDB(task);
      } catch (err) {
        throw err;
      }
    }
  }

  async addTask(taskInput, isCompleted, position) {
    if (this.isPokemonTask(taskInput)) {
      return await this.addCatchPokemonTask(taskInput, position);
    } else {
      try {
        const taskAdded = await this.addTaskToFile(
          taskInput,
          isCompleted,
          position
        );
        return [taskAdded];
      } catch (err) {
        return { error: err, message: ERR_W_ADD_TO_DB };
      }
    }
  }

  constructUpdatedTask(task, UpdatedTask) {
    console.log(UpdatedTask);
    if (task.status === false && UpdatedTask.status === true) {
      task.doneAt = new Date();
    } else if (task.status === true && UpdatedTask.status === false) {
      task.doneAt = null;
    }
    task.status = UpdatedTask.status;
    task.itemName = UpdatedTask.itemName;
  }

  async updateTask(taskID, taskToUpdate) {
    const task = this.tasks.find((task) => task.id == taskID);
    if (!task) {
      return { error: TASK_NOT_FOUND, message: TASK_NOT_FOUND };
    }
    this.constructUpdatedTask(task, taskToUpdate);
    try {
      await Item.update(
        {
          itemName: task.itemName,
          status: task.status,
          doneAt: task.doneAt,
        },
        { where: { id: taskID } }
      );
      return task;
    } catch (err) {
      return { error: err, message: ERR_W_UPDATE_TASK };
    }
  }

  isRequestAdded(res) {
    if (Array.isArray(res)) {
      if (res.length === 0) {
        return false;
      }
    }
    return true;
  }

  async RemoveTaskFromDB(taskID) {
    const task = this.tasks.find((task) => task.id == taskID);
    if (!task) {
      return { error: TASK_NOT_FOUND, message: TASK_NOT_FOUND };
    }
    this.tasks = this.tasks.filter((task) => task.id != taskID);
    try {
      await Item.destroy({
        where: {
          id: taskID,
        },
      });
      return { message: TASK_REMOVED };
    } catch (err) {
      return { error: err, message: ERR_W_DELETE_FROM_DB };
    }
  }

  async RemoveAllTasksFromDB() {
    this.tasks = [];
    try {
      const response = await Item.destroy({
        where: {},
        truncate: true,
      });
      return { message: TASK_REMOVED };
    } catch (err) {
      return { error: err, message: ERR_W_DELETE_FROM_DB };
    }
  }

  saveResponseToCache(input, response) {
    const time = new Date().getTime();
    const cache = this.getCache();
    cache[input] = response;
    cache["time"] = time;
    fs.writeFileSync(
      path.join(__dirname, this.cacheFile),
      JSON.stringify(cache)
    );
  }

  async getTasks() {
    try {
      const tasks = await Item.findAll();
      this.tasks = tasks.map((task) => task.dataValues);
      return this.tasks;
    } catch (err) {
      return { error: err, message: ERR_W_GET_TASKS };
    }
  }

  async reSortTasks(newSortedTasks) {
    try {
      for (let i = 0; i < newSortedTasks.length; i++) {
        const task = newSortedTasks[i];
        await Item.update({ position: i }, { where: { id: task.id } });
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = ItemManager;
