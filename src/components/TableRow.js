import React from 'react';
import TableCell from './TableCell';
import TableCellButton from './TableCellButton';

function TableRow(props) { 
  return (
    <tr className="TableRow">
      <TableCell value={props.listing.Name} />
      <TableCell value={props.listing.Category} />
      <TableCell value={props.listing.Address} />
      <TableCell value={props.listing.Address2} />
      <TableCell value={props.listing.City} />
      <TableCell value={props.listing.Postal} />
      <TableCell value={props.listing.Phone} />
      <TableCell value={props.listing.Website} url={true} />
      <TableCell value={props.listing.Facebook} url={true} />
      <TableCellButton editing={false} editButtonClick={props.editButtonClick} id={props.listing.ID} />
    </tr>
  )
}

export default TableRow;
