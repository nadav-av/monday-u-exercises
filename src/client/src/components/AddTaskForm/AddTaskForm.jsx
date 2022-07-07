import React, { useCallback, useEffect, useState } from "react";
import ItemClient from "../../services/taskService";

import "./addTaskForm.css";

const AddTaskForm = ({
  tasks,
  addTaskAction,
  updateTaskAction,
  editTask,
  setEditTaskAction,
  setErrorMessage,
}) => {
  const addTask = useCallback(
    (input, position) => {
      addTaskAction(input, position);
    },
    [addTaskAction]
  );

  const updateTask = useCallback(
    (task) => {
      updateTaskAction(task);
    },
    [updateTaskAction]
  );

  const setEditTask = useCallback(
    (task) => {
      setEditTaskAction(task);
    },
    [setEditTaskAction]
  );

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

  const handleEditTask = async (input, id, status) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    taskToEdit.itemName = input;
    taskToEdit.status = status;
    const isEdited = await taskService.updateTask(taskToEdit);
    if (isEdited) {
      updateTask(taskToEdit);
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
      const taskToEdit = tasks.find((task) => task.id === editTask.id);
      taskToEdit.itemName = input;
      updateTask(taskToEdit);
      setEditTask(null);
      setInput("");
    } else {
      if (input.trim()) {
        const position = tasks.length;
        addTask(input, position);
        setInput("");
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

export default AddTaskForm;
