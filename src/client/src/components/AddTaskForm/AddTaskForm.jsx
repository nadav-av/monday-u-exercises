import React, { useCallback, useEffect, useState } from "react";
import UndoBtn from "./UndoBtnConnector";
import { EMPTY_INPUT } from "../../services/globalConsts";
import "./addTaskForm.css";

const AddTaskForm = ({
  tasks,
  editTask,
  isErrorToastVisible,
  isTasksToRestoreExists,
  addTaskAction,
  updateTaskAction,
  setErrorMessageAction,
  setEditTaskAction,
  setIsErrorToastVisibleAction,
}) => {
  const addTask = useCallback(
    (input, status, position) => {
      addTaskAction(input, status, position);
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

  const setIsErrorToastVisible = useCallback(
    (flag) => {
      setIsErrorToastVisibleAction(flag);
    },
    [setIsErrorToastVisibleAction]
  );

  const [input, setInput] = useState("");

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

  const setErrorMessage = (msg) => {
    setErrorMessageAction(msg);
  };

  const isEmptyInputSubmitted = () => {
    if (input.length === 0) {
      setIsErrorToastVisible(true);
      setErrorMessage(EMPTY_INPUT);
      return true;
    }
  };

  const handleEditTask = () => {
    const taskToEdit = tasks.find((task) => task.id === editTask.id);
    const taskToEditClone = { ...taskToEdit };
    taskToEditClone.itemName = input;
    updateTask(taskToEditClone);
    setEditTask(null);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (isErrorToastVisible) {
      setIsErrorToastVisible(false);
    }
    const isEmptyInput = isEmptyInputSubmitted();
    if (isEmptyInput) {
      return;
    }

    if (editTask) {
      handleEditTask();
    } else {
      const trimmedInput = input.trim();
      if (trimmedInput) {
        const position = tasks.length;
        addTask(trimmedInput, false, position);
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
      {isTasksToRestoreExists && <UndoBtn />}
    </form>
  );
};

export default AddTaskForm;
