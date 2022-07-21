import { Dropdown } from "monday-ui-react-core";
import React, { useCallback } from "react";
import { TaskStatus } from "../../services/globalConsts";
import "./statusFilter.css";

const StatusFilter = ({ setFilterAction }) => {
  const setFilter = useCallback(
    (e) => {
      setFilterAction(e.value);
    },
    [setFilterAction]
  );

  return (
    <Dropdown
      className="dropdown-stories-styles_spacing selectDrop"
      onOptionSelect={(e) => setFilter(e)}
      onOptionRemove={() => setFilter({ value: TaskStatus.ALL, label: "All" })}
      options={[
        {
          label: "All",
          value: TaskStatus.ALL,
        },
        {
          label: "Completed",
          value: TaskStatus.COMPLETED,
        },
        {
          label: "Uncompleted",
          value: TaskStatus.UNCOMPLETED,
        },
      ]}
      placeholder="filter"
    />
  );
};

export default StatusFilter;
