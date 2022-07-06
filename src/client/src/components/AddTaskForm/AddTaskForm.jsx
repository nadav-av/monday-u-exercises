import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemClient from "../../services/taskService";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getTasks } from "../../redux/selectors/tasksSelector";

import "./addTaskForm.css";
import {
  addTaskAction,
  updateTaskAction,
} from "./../../redux/actions/tasks_actions";

const AddTaskForm = ({
  tasks,
  addTaskAction,
  updateTaskAction,
  editTask,
  setEditTask,
  setErrorMessage,
}) => {
  const addTask = useCallback(
    (task) => {
      addTaskAction(task);
    },
    [addTaskAction]
  );

  const updateTask = useCallback(
    (task) => {
      updateTaskAction(task);
    },
    [updateTaskAction]
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
      handleEditTask(input, editTask.id, editTask.status);
    } else {
      if (input.trim()) {
        const position = tasks.length;
        console.log("DEBUG: ", {
          itemName: input,
          position: position,
        });
        const addedTasks = await taskService.addTask(input, false, position);
        if (addedTasks.status === 200) {
          for (let i = 0; i < addedTasks.length; i++) {
            addTask(addedTasks[i]);
          }
          setInput("");
        } else {
          if (addedTasks.status === 409) {
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
  editTask: PropTypes.object,
  setEditTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const tasks = getTasks(state);
  return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    {
      addTaskAction,
      updateTaskAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
