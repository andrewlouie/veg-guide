import React from 'react';

function FilterDropDown(props) {
  return (
    <select value={props.value} onChange={props.onChange}>
      {props.options.map((option, idx) => {
        return (<option value={idx} key={idx}>{option}</option>);
      })}
    </select>
  )
}

export default FilterDropDown;
