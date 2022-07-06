import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TaskItem from "../TaskItem/TaskItem";
import ItemClient from "../../services/taskService";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { COMPLETED, UNCOMPLETED } from "../../services/globalConsts";
import { connect } from "react-redux";
import { getTasks } from "../../redux/selectors/tasksSelector";
import actionTypes from "../../redux/constans";
import "./taskList.css";
import {
  removeTaskAction,
  setTasksAction,
  updateTaskAction,
} from "./../../redux/actions/tasks_actions";
import { bindActionCreators } from "redux";

const TasksList = ({
  tasks,
  removeTaskAction,
  setTasksAction,
  updateTaskAction,
  setEditTask,
  searchInput,
  statusFilter,
  setPresentedTasksNum,
}) => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const taskService = new ItemClient();

  useEffect(() => {
    const searchFilteredTasks = tasks.filter((task) => {
      return task.itemName.toLowerCase().includes(searchInput.toLowerCase());
    });

    let statusFilteredTasks = [];

    switch (statusFilter) {
      case COMPLETED:
        statusFilteredTasks = searchFilteredTasks.filter(
          (task) => task.status === true
        );
        break;
      case UNCOMPLETED:
        statusFilteredTasks = searchFilteredTasks.filter(
          (task) => task.status === false
        );
        break;
      default:
        statusFilteredTasks = searchFilteredTasks;
        break;
    }

    setFilteredTasks(statusFilteredTasks);
    setPresentedTasksNum(statusFilteredTasks.length);
  }, [tasks, searchInput, statusFilter]);

  const handleDelete = async (task) => {
    const isDeleted = await taskService.removeTask(task.id);
    if (isDeleted) {
      removeTaskAction(isDeleted.id);
    }
  };

  const handleComplete = async (task) => {
    const taskToUpdate = tasks.find((t) => t.id === task.id);
    taskToUpdate.status = !taskToUpdate.status;
    const updatedTask = await taskService.updateTask(taskToUpdate);
    if (updatedTask) {
      updateTaskAction(taskToUpdate);
    }
  };

  const handleOnDragEnd = async (result) => {
    const items = [...tasks];
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);
    setTasksAction(items);
    await taskService.updateTaskOrder(items);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              className="tasks"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTasks.map((task, index) => (
                <Draggable
                  key={task.id.toString()}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      className="tasks-list"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <TaskItem
                        task={task}
                        setEditTask={setEditTask}
                        handleComplete={handleComplete}
                        handleDelete={handleDelete}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

TasksList.propTypes = {
  setEditTask: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  statusFilter: PropTypes.string.isRequired,
  setPresentedTasksNum: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const tasks = getTasks(state);
  return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators(
    { updateTaskAction, setTasksAction, removeTaskAction },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksList);
