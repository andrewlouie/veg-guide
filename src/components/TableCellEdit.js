import React from 'react';

function TableCellEdit(props) { 
  return (
    <td className="TableCellEdit">
      <label className="mobileLabel">
        <span className="mobileLabel-inner">{props.objectKey}</span>
        <input type="text" value={props.value} onChange={(evt) => props.changeInput(props.objectKey, evt.target.value)}/>
      </label>
    </td>
  )
}

export default TableCellEdit;
