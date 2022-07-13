import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import TaskButtons from "../TaskButtons/TaskButtons";
import "./taskItem.css";

const TaskItem = ({
  task,
  setEditTaskAction,
  updateTaskAction,
  removeTaskAction,
}) => {
  const toggleTaskStatus = useCallback(() => {
    updateTaskAction({ ...task, status: !task.status });
  }, [updateTaskAction]);

  const removeTask = useCallback(() => {
    removeTaskAction(task.id);
  }, [removeTaskAction]);

  const setEditTask = useCallback(() => {
    setEditTaskAction(task);
  }, [setEditTaskAction]);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      data-testid={`item-${task.id}`}
      className="task-item"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="grip-lines">
        <i className="fa-solid fa-grip-lines" />
      </div>
      <div
        className={
          task.status ? "task-item-content completed" : "task-item-content"
        }
      >
        <p>{task.itemName}</p>
      </div>
      {isHovering && (
        <TaskButtons
          key={task.id}
          handleComplete={toggleTaskStatus}
          handleDelete={removeTask}
          handleEdit={setEditTask}
        />
      )}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskItem;
