import React from 'react';

function FilterDropDown(props) {
  return (
    <div className="FilterDropDown">
      <label className="bigLabel" htmlFor="categoryBox">Filter By Category</label>
      <select value={props.value} onChange={props.onChange} id="categoryBox">
        {props.options.map((option, idx) => {
          return (<option value={idx} key={idx}>{option}</option>);
        })}
      </select>
    </div>
  )
}

export default FilterDropDown;
