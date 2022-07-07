import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import TaskItem from "../TaskItem/TaskItemConnector";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { COMPLETED, UNCOMPLETED } from "../../services/globalConsts";
import "./taskList.css";

const TasksList = ({
  tasks,
  setTasksAction,
  searchInput,
  statusFilter,
  setPresentedTasksNum,
}) => {
  const setTasks = useCallback(
    (tasks) => {
      setTasksAction(tasks);
    },
    [setTasksAction]
  );

  const [filteredTasks, setFilteredTasks] = useState([]);

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

  const handleOnDragEnd = async (result) => {
    const items = [...tasks];
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);
    setTasks(items);
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
                      <TaskItem task={task} />
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
  setPresentedTasksNum: PropTypes.func.isRequired,
};

export default TasksList;
