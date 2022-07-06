import React, { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm.jsx";
import TasksList from "../../components/TasksList/TasksList.jsx";
import EmptyListNote from "../../components/EmptyListNote/EmptyListNote.jsx";
import ActionBar from "../../components/ActionBar/ActionBar.jsx";
import RemoveAllBtn from "../../components/RemoveAllButton/RemoveAllBtn.jsx";
import { ALL } from "../../services/globalConsts";
import { Toast } from "monday-ui-react-core";
import { connect } from "react-redux";
import { getTasks } from "../../redux/selectors/tasksSelector";
import { bindActionCreators } from "redux";
import { removeAllTasksAction } from "../../redux/actions/tasks_actions";

import "./tasks.css";

const Tasks = ({ tasks, removeAllTasksAction }) => {
  const [editTask, setEditTask] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [presentedTasksNum, setPresentedTasksNum] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRemoveAll = () => {
    this.props.removeAllTasks();
  };

  const showRemoveAllBtn = () => {
    if (presentedTasksNum === tasks.length && tasks.length > 0) {
      return <RemoveAllBtn handleRemoveAll={handleRemoveAll} />;
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
          <AddTaskForm
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

const mapStateToProps = (state, ownProps) => {
  const tasks = getTasks(state);
  return { tasks };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ removeAllTasksAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
