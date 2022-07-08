import React, { useState, useCallback, useEffect } from "react";
import Header from "../../components/Header/Header.jsx";
import TasksList from "../../components/TasksList/TaskListConnector";
import EmptyListNote from "../../components/EmptyListNote/EmptyListNote.jsx";
import ActionBar from "../../components/ActionBar/ActionBar.jsx";
import RemoveAllBtn from "../../components/RemoveAllButton/RemoveAllBtnConnector";
import { Toast } from "monday-ui-react-core";
import AddTasksForm from "../../components/AddTaskForm/AddTaskFormConnector";
import HashLoader from "react-spinners/HashLoader";

import "./tasks.css";

const Tasks = ({
  tasks,
  errorMsg,
  isErrorToastVisible,
  isLoading,
  removeAllTasksAction,
  getTasksAction,
  setIsErrorToastVisibleAction,
}) => {
  const getTasks = useCallback(() => {
    getTasksAction();
  }, [getTasksAction]);

  const setIsErrorVisable = useCallback(
    (flag) => {
      setIsErrorToastVisibleAction(flag);
    },
    [setIsErrorToastVisibleAction]
  );

  useEffect(() => {
    getTasks();
  }, []);

  const [presentedTasksNum, setPresentedTasksNum] = useState(0);

  const showRemoveAllBtn = () => {
    if (presentedTasksNum === tasks.length && tasks.length > 0) {
      return <RemoveAllBtn />;
    } else return null;
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <Toast
          className="monday-storybook-toast_wrapper"
          open={isErrorToastVisible}
          onClose={() => {
            setIsErrorVisable(false);
          }}
          type={Toast.types.NEGATIVE}
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

        <div>
          {isLoading ? (
            <div className="loading-wrapper">
              <HashLoader color="#fea8a8" size="100px" />
            </div>
          ) : (
            <div>
              <div>{tasks.length === 0 ? <EmptyListNote /> : null}</div>
              <TasksList setPresentedTasksNum={setPresentedTasksNum} />
              {showRemoveAllBtn()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
