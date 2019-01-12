import React from 'react';

function TableCellButton(props) {
  if (props.editing) {
    if (typeof props.id === 'undefined') {
      return (
        <td className="TableCellButton">
          <button className="submitButton" onClick={() => props.submitButtonClick(props.id)}>Submit</button>
        </td>
      )
    }
    return (
      <td className="TableCellButton">
        <button onClick={() => props.editButtonClick(props.id)} aria-label="Edit Row"><i className="fa fa-times" aria-hidden="true"></i></button>
        <button className="submitButton" onClick={() => props.submitButtonClick(props.id)}>Submit</button>
      </td>
    );
  }
  return (
    <td className="TableCellButton">
      <button onClick={() => props.editButtonClick(props.id)} aria-label="Edit Row"><i className="fa fa-pencil" aria-hidden="true"></i></button>
    </td>
  )
}

export default TableCellButton;
