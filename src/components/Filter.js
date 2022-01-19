import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Filter = (props) => {
  const { openFilter, setOpenFilter } = useContext(AppContext);

  return (
    <button
      type="button"
      className="btn btn-primary mb-4"
      onClick={() => setOpenFilter(!openFilter)}
    >
      Filter
    </button>
  );
};

export default Filter;
