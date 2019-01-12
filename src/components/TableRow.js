import React from 'react';
import TableCell from './TableCell';
import TableCellButton from './TableCellButton';

function TableRow(props) { 
  return (
    <tr className="TableRow">
      <TableCell value={props.listing.Name} />
      <TableCell value={props.listing.Category.replace(' - ','\n')} />
      <TableCell value={props.listing.Address} />
      <TableCell value={props.listing.Address2} />
      <TableCell value={props.listing.City} />
      <TableCell value={props.listing.Postal} />
      <TableCell value={`tel://${props.listing.Phone}`} url={true} icon="phone" aria={`Phone ${props.listing.Name}`} />
      <TableCell value={props.listing.Website} url={true} icon="globe"  aria={`Visit Website for ${props.listing.Name}`} />
      <TableCell value={props.listing.Facebook} url={true} icon="facebook" aria={`Visit Facebook page for ${props.listing.Name}`} />
      <TableCellButton editing={false} editButtonClick={props.editButtonClick} id={props.listing.ID} />
    </tr>
  )
}

export default TableRow;
