import React from 'react';

function TableHeader(props) { 
  return (
    <React.Fragment>
      <colgroup>
        <col span="1" width="22%" />
        <col span="1" width="16%" />
        <col span="1" width="16%" />
        <col span="1" width="8%" />
        <col span="1" width="8%" />
        <col span="1" width="6%" />
        <col span="1" width="6%" />
        <col span="1" width="6%" />
        <col span="1" width="6%" />
        <col span="1" width="6%" />
      </colgroup>
      <thead>
        <tr className="TableHeader">
          <th scope="col">Name</th>
          <th scope="col">Category</th>
          <th scope="col">Address</th>
          <th scope="col">Address 2</th>
          <th scope="col">City</th>
          <th scope="col">Postal</th>
          <th scope="col">Phone</th>
          <th scope="col">Website</th>
          <th scope="col">Facebook</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
    </React.Fragment>
  )
}

export default TableHeader;
