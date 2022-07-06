import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemClient from "../../services/taskService";

import "./addTaskForm.css";

const AddTaskForm = ({
  tasks,
  setTasks,
  editTask,
  setEditTask,
  setErrorMessage,
}) => {
  const [input, setInput] = useState("");

  const taskService = new ItemClient();
  let iconClassName;

  useEffect(() => {
    if (editTask) {
      setInput(editTask.itemName);
    } else {
      setInput("");
    }
  }, [editTask, setInput]);

  const setButtonIcon = () => {
    if (editTask) {
      iconClassName = "fa fa-pencil-alt";
    } else {
      iconClassName = "fa fa-plus";
    }
  };

  const updateTask = async (input, id, status) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    taskToEdit.itemName = input;
    taskToEdit.status = status;
    const isEdited = await taskService.updateTask(taskToEdit);
    if (isEdited) {
      setTasks(
        tasks.map((task) => {
          if (task.id === id) {
            return taskToEdit;
          }
          return task;
        })
      );
      setEditTask(null);
    } else {
      setErrorMessage("Error updating task");
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (input.length === 0) {
      setErrorMessage("Cannot add an empy task");
      return;
    }
    if (editTask) {
      updateTask(input, editTask.id, editTask.status);
    } else {
      if (input.trim()) {
        const position = tasks.length;
        const res = await taskService.addTask(input, false, position);
        if (res.status === 200) {
          setTasks([...tasks, ...res.response]);
        } else {
          if (res.status === 409) {
            setErrorMessage("Task already exists");
          }
        }
      }
    }
    setInput("");
  };

  return (
    <form className="add-task-action" onSubmit={onFormSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Enter new Task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="button-add">
        {setButtonIcon()}
        <i className={iconClassName}></i>
      </button>
    </form>
  );
};

AddTaskForm.propTypes = {
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
  editTask: PropTypes.object,
  setEditTask: PropTypes.func.isRequired,
};

export default AddTaskForm;
