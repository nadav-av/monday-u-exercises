// Define your endpoints here (this is your "controller file")
const ItemManager = require("../services/item_manager.js");
const {
  ERR_W_ADD_TO_DB,
  TASK_ALREADY_EXISTS,
  TASK_NOT_FOUND,
} = require("../services/globalConsts/GlobalConstants.js");
const express = require("express");
const router = express.Router();

const tasksManager = new ItemManager();

//fech all tasks from tasks.json file
router.get("/", async (req, res) => {
  const response = await tasksManager.getTasks();
  if (response.error) {
    res.status(500).send(response);
  } else {
    res.status(200).send(response);
  }
});

//add new task to tasks.json file
router.post("/", async (req, res) => {
  console.log(req.body);
  const {
    itemName: taskInput,
    status: isCompleted,
    position: position,
  } = req.body;
  const response = await tasksManager.addTask(taskInput, isCompleted, position);
  if (response.error) {
    if (response.error === ERR_W_ADD_TO_DB) {
      res.status(500).send(response);
    } else if (response.error === TASK_ALREADY_EXISTS) {
      res.status(400).send(response);
    }
  } else {
    res.status(200).send(response);
  }
});

router.put("/resort", (req, res) => {
  const { tasks } = req.body;
  const sorted = tasksManager.reSortTasks(tasks);
  if (sorted) {
    res.status(200).json({ message: "Tasks was resorted" });
  } else {
    res.status(500).json({ error: "Error" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedContent = req.body;
  const isUpdated = await tasksManager.updateTask(id, updatedContent);
  if (isUpdated.error) {
    if (isUpdated.error === TASK_NOT_FOUND) {
      res.status(400).send(isUpdated);
    } else {
      res.status(500).send(isUpdated);
    }
  } else {
    res.status(200).send(isUpdated);
  }
});

router.delete("/:id", async (req, res) => {
  const taskID = req.params.id;
  const response = await tasksManager.RemoveTaskFromDB(taskID);
  if (response.error) {
    if (response.error === TASK_NOT_FOUND) {
      res.status(400).send(response);
    } else {
      res.status(500).send(response);
    }
  } else {
    res.status(200).send(response);
  }
});

router.delete("/", async (req, res) => {
  const response = await tasksManager.RemoveAllTasksFromDB();
  if (response.error) {
    res.status(500).send(response);
  }
  res.status(200).send(response);
});

module.exports = router;
