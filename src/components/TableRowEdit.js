import React from 'react';
import TableCellEdit from './TableCellEdit';
import TableCellButton from './TableCellButton';

function TableRowEdit(props) {
  function changeInput(key, value) {
    props.changeInput(props.listing.ID || null, key, value);
  }
  
  return (
    <tr className="TableRowEdit">
      <TableCellEdit value={props.listing.Name} objectKey={'Name'} changeInput={changeInput} />
      <TableCellEdit value={props.listing.Category} objectKey={'Category'} changeInput={changeInput} />
      <TableCellEdit value={props.listing.Address} objectKey={'Address'} changeInput={changeInput} />
      <TableCellEdit value={props.listing.Address2} objectKey={'Address2'} changeInput={changeInput} />
      <TableCellEdit value={props.listing.City} objectKey={'City'} changeInput={changeInput} />
      <TableCellEdit value={props.listing.Postal} objectKey={'Postal'} changeInput={changeInput} />
      <TableCellEdit value={props.listing.Phone} objectKey={'Phone'} changeInput={changeInput} />
      <TableCellEdit value={props.listing.Website} objectKey={'Website'} changeInput={changeInput} />
      <TableCellEdit value={props.listing.Facebook} objectKey={'Facebook'} changeInput={changeInput} />
      <TableCellButton id={props.listing.ID} editing={true} editButtonClick={props.editButtonClick} submitButtonClick={props.submitButtonClick} />
    </tr>
  )
}

export default TableRowEdit;
