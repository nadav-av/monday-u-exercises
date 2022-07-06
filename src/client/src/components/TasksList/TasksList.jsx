import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TaskItem from "../TaskItem/TaskItem";
import ItemClient from "../../services/taskService";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { setTasks } from "../../redux/reducers/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTaskAsync,
  removeTaskAsync,
} from "../../redux/reducers/taskSlice";
import "./taskList.css";

const TasksList = ({
  setEditTask,
  searchInput,
  statusFilter,
  setPresentedTasksNum,
}) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const taskService = new ItemClient();

  useEffect(() => {
    const searchFilteredTasks = tasks.filter((task) => {
      return task.itemName.toLowerCase().includes(searchInput.toLowerCase());
    });

    let statusFilteredTasks = [];

    switch (statusFilter) {
      case "completed":
        statusFilteredTasks = searchFilteredTasks.filter(
          (task) => task.status === true
        );
        break;
      case "uncompleted":
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
    dispatch(removeTaskAsync(task.id));
  };

  const handleComplete = async (task) => {
    console.log(task);
    await dispatch(updateTaskAsync(task));
  };

  const handleOnDragEnd = async (result) => {
    const items = [...tasks];
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);
    dispatch(setTasks(items));
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

export default TasksList;
