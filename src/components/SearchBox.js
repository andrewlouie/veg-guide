import React from 'react';

function SearchBox(props) {
  return (
    <input type="search" value={props.value} onChange={props.onChange} />
  )
}

export default SearchBox;
