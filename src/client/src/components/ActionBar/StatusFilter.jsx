import { Dropdown } from "monday-ui-react-core";
import React, { useCallback } from "react";
import { ALL, COMPLETED, UNCOMPLETED } from "../../services/globalConsts";
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
      onOptionRemove={() => setFilter({ value: ALL, label: "All" })}
      options={[
        {
          label: "All",
          value: ALL,
        },
        {
          label: "Completed",
          value: COMPLETED,
        },
        {
          label: "Uncompleted",
          value: UNCOMPLETED,
        },
      ]}
      placeholder="filter"
    />
  );
};

export default StatusFilter;
