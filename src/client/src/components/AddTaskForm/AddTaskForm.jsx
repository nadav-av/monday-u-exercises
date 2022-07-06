import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemClient from "../../services/taskService";
import { addTask, setTasks } from "../../redux/reducers/taskSlice";
import { addTaskAsync } from "../../redux/reducers/taskSlice";
import { useDispatch, useSelector } from "react-redux";

import "./addTaskForm.css";

const AddTaskForm = ({
  editTask,
  setEditTask,
  setErrorMessage,
  setIsErrorShown,
}) => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

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

  const updateTask = async (input, id, itemName, status) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    taskToEdit.itemName = input;
    taskToEdit.status = status;
    const isEdited = await taskService.updateTask(taskToEdit);

    if (isEdited) {
      dispatch(
        setTasks(
          tasks.map((task) => {
            if (task.id === id) {
              return taskToEdit;
            }
            return task;
          })
        )
      );
      setEditTask(null);
    } else {
      alert("Error updating task");
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsErrorShown(false);
    if (input.length === 0) {
      setErrorMessage("Cannot add an empy task");
      setIsErrorShown(true);
      return;
    }
    if (editTask) {
      updateTask(input, editTask.id, editTask.itemName, editTask.status);
    } else {
      const newTask = {
        input: input,
        status: false,
        position: tasks.length,
      };
      await dispatch(addTaskAsync(newTask));
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
  editTask: PropTypes.object,
  setEditTask: PropTypes.func.isRequired,
};

export default AddTaskForm;
