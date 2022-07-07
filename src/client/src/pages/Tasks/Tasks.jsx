import React, { useState, useCallback, useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import TasksList from "../../components/TasksList/TaskListConnector";
import EmptyListNote from "../../components/EmptyListNote/EmptyListNote.jsx";
import ActionBar from "../../components/ActionBar/ActionBar.jsx";
import RemoveAllBtn from "../../components/RemoveAllButton/RemoveAllBtn.jsx";
import { Toast } from "monday-ui-react-core";
import AddTasksForm from "../../components/AddTaskForm/AddTaskFormConnector";

import "./tasks.css";

const Tasks = ({
  tasks,
  errorMsg,
  removeAllTasksAction,
  getTasksAction,
  setErrorMessageAction,
}) => {
  const getTasks = useCallback(() => {
    getTasksAction();
  }, [getTasksAction]);

  const setErrorMsg = useCallback(
    (msg) => {
      setErrorMessageAction(msg);
    },
    [setErrorMessageAction]
  );

  useEffect(() => {
    getTasks();
  }, []);

  const [presentedTasksNum, setPresentedTasksNum] = useState(0);

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
          open={errorMsg !== ""}
          onClose={setErrorMsg("")}
          type={Toast.types.NEGATIVE}
          autoHideDuration={5000}
        >
          {errorMsg}
        </Toast>
        <div>
          <Header headline="Tasks List" />
        </div>

        <ActionBar></ActionBar>
        <div>
          <AddTasksForm />
        </div>
        {/* if taskslist empty show empty message */}
        {tasks.length === 0 ? (
          <EmptyListNote />
        ) : (
          <div>
            <TasksList setPresentedTasksNum={setPresentedTasksNum} />
          </div>
        )}
        <div>{showRemoveAllBtn()}</div>
      </div>
    </div>
  );
};

export default Tasks;
