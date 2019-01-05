import React from 'react';

function TableCellEdit(props) { 
  return (
    <td className="TableCellEdit">
      <input type="text" value={props.value} onChange={(evt) => props.changeInput(props.objectKey, evt.target.value)}/>
    </td>
  )
}

export default TableCellEdit;
