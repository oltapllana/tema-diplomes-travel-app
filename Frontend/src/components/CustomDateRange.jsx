import React from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CustomDateRange = ({ dateRange, setDateRange }) => {
  return (
    <DateRange
      editableDateInputs={true}
      onChange={(item) => setDateRange([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={dateRange}
      className="date"
      minDate={new Date()}
    />
  );
};

export default CustomDateRange;
