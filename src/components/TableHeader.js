import React from 'react';
import SearchBox from './SearchBox';
import FilterDropDown from './FilterDropDown';

function TableHeader(props) { 
  return (
    <thead>
      <tr className="TableHeader">
        <th>Name</th>
        <th>Category</th>
        <th>Address</th>
        <th>Address2</th>
        <th>City</th>
        <th>Postal</th>
        <th>Phone</th>
        <th>Website</th>
        <th>Facebook</th>
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
