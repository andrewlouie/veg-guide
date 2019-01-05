import React from 'react';

function TableCellButton(props) {
  if (props.editing) {
    if (typeof props.id === 'undefined') {
      return (
        <td className="TableCellButton">
          <button onClick={() => props.submitButtonClick(props.id)}>Submit</button>
        </td>
      )
    }
    return (
      <td className="TableCellButton">
        <button onClick={() => props.editButtonClick(props.id)}>Cancel</button>
        <button onClick={() => props.submitButtonClick(props.id)}>Submit</button>
      </td>
    );
  }
  return (
    <td className="TableCellButton">
      <button onClick={() => props.editButtonClick(props.id)}>Edit</button>
    </td>
  )
}

export default TableCellButton;
