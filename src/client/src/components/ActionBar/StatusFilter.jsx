import { Dropdown } from "monday-ui-react-core";
import React from "react";
import { ALL, COMPLETED, UNCOMPLETED } from "../../services/globalConsts";
import "./statusFilter.css";

const StatusFilter = ({ setFilter }) => {
  return (
    <Dropdown
      className="selectDrop"
      onOptionSelect={(e) => setFilter(e.value)}
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
