import React from 'react';
import SearchBox from './SearchBox';
import FilterDropDown from './FilterDropDown';

function TableHeader(props) { 
  return (
    <thead>
      <tr className="TableHeader">
        <th scope="col">Name</th>
        <th scope="col">Category</th>
        <th scope="col">Address</th>
        <th scope="col">Address2</th>
        <th scope="col">City</th>
        <th scope="col">Postal</th>
        <th scope="col">Phone</th>
        <th scope="col">Website</th>
        <th scope="col">Facebook</th>
      </tr>
      <tr className="TableFilter">
        <th>
          <SearchBox value={props.filterText} onChange={props.searchBoxChange} />
        </th>
        <th>
          <FilterDropDown options={props.uniqueCategories} value={props.filterCategory} onChange={props.selectCategory} />
        </th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
  )
}

export default TableHeader;
