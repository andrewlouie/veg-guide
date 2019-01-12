import React from 'react';

function SearchBox(props) {
  return (
    <div className="SearchBox">
      <label className="bigLabel" htmlFor="searchBox">Filter By Name</label>
      <input type="search" id="searchBox" value={props.value} onChange={props.onChange} />
    </div>
  )
}

export default SearchBox;
