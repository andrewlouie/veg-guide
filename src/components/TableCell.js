import React from 'react';

function TableCell(props) {
  if (props.url && props.value) {
    return (
      <td className="TableCell">
        <a rel="noopener noreferrer" href={props.value.substr(0,7) === 'http://' || props.value.substr(0,8) === 'https://' ? props.value : `http://${props.value}`} target="_blank">{props.value}</a>
      </td>
    )
  }
  return (
    <td className="TableCell">
      {props.value}
    </td>
  )
}

export default TableCell;
