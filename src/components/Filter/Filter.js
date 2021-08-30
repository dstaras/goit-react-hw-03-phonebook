import React from "react";
import PropTypes from "prop-types";

const Filter = ({ onFilter, value }) => {
  return (
    <>
      <label>
        Find contacts by name
        <input
          type="text"
          name="keyword"
          value={value}
          onChange={(e) => onFilter(e.target.value)}
        />
      </label>
    </>
  );
};

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Filter;
