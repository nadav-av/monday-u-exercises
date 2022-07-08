import React, { useCallback } from "react";
import "./reomoveAllBtn.css";

const RemoveAllBtn = ({ removeAllTasksAction }) => {
  
  const removeAllTasks = useCallback(() => {
    removeAllTasksAction();
  }, [removeAllTasksAction]);

  return (
    <div className="remove-all">
      <button
        className="btn remove-all-btn"
        type="button"
        onClick={() => removeAllTasks()}
      >
        Remove all
      </button>
    </div>
  );
};

export default RemoveAllBtn;
