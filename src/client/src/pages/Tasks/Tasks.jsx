import React, { useState, useCallback, useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import TasksList from "../../components/TasksList/TaskListConnector";
import EmptyListNote from "../../components/EmptyListNote/EmptyListNote.jsx";
import ActionBar from "../../components/ActionBar/ActionBar.jsx";
import RemoveAllBtn from "../../components/RemoveAllButton/RemoveAllBtn.jsx";
import { ALL } from "../../services/globalConsts";
import { Toast } from "monday-ui-react-core";
import AddTasksForm from "../../components/AddTaskForm/AddTaskFormConnector";
import ItemClient from "../../services/taskService";

import "./tasks.css";

const Tasks = ({ tasks, removeAllTasksAction, setTasksAction }) => {
  const compare = (a, b) => {
    if (a.position < b.position) return -1;
    if (a.position > b.position) return 1;
    return 0;
  };

  useEffect(() => {
    const itemService = new ItemClient();
    const tasks = itemService.fetchTasks().then((tasks) => {
      const sortedTasks = tasks.sort(compare);
      setTasksAction(sortedTasks);
    }, []);
  });

  const [editTask, setEditTask] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [presentedTasksNum, setPresentedTasksNum] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const setTasks = useCallback(
    (tasks) => {
      setTasksAction(tasks);
    },
    [setTasksAction]
  );

  const removeAllTasks = useCallback(() => {
    removeAllTasksAction();
  }, [removeAllTasksAction]);

  const showRemoveAllBtn = () => {
    if (presentedTasksNum === tasks.length && tasks.length > 0) {
      return <RemoveAllBtn handleRemoveAll={removeAllTasks} />;
    } else return null;
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <Toast
          className="monday-storybook-toast_wrapper"
          open={errorMessage !== ""}
          onClose={() => setErrorMessage("")}
          type={Toast.types.NEGATIVE}
          autoHideDuration={5000}
        >
          {errorMessage}
        </Toast>
        <div>
          <Header headline="Tasks List" />
        </div>

        <ActionBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setFilter={setStatusFilter}
        ></ActionBar>
        <div>
          <AddTasksForm
            editTask={editTask}
            setEditTask={setEditTask}
            setErrorMessage={setErrorMessage}
          />
        </div>
        {/* if taskslist empty show empty message */}
        {tasks.length === 0 ? (
          <EmptyListNote />
        ) : (
          <div>
            <TasksList
              statusFilter={statusFilter}
              searchInput={searchInput}
              setEditTask={setEditTask}
              setPresentedTasksNum={setPresentedTasksNum}
            />
          </div>
        )}
        <div>{showRemoveAllBtn()}</div>
      </div>
    </div>
  );
};

export default Tasks;
