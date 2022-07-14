import React, { useCallback } from "react";
import "./undoBtn.css";

const UndoBtn = ({ deletedTasks, tasksLength, restoreDeletedTaskAction }) => {
  const restoreTask = useCallback(() => {
    restoreDeletedTaskAction(deletedTasks[0], tasksLength);
  }, [restoreDeletedTaskAction, deletedTasks]);

  return (
    <button className="btn restore-btn" type="button" onClick={restoreTask}>
      Undo
    </button>
  );
};

export default UndoBtn;
