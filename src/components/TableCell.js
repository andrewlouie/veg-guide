import React from 'react';

function TableCell(props) {
  if (props.url && props.value) {
    return (
      <td className="TableCell">
        <a rel="noopener noreferrer" href={props.value.substr(0,8).includes('://') ? props.value : `http://${props.value}`} target="_blank" title={props.value} aria-label={props.aria}>
          <i className={`fa fa-${props.icon}`} aria-hidden="true"></i>
        </a>
      </td>
    )
  }
  return (
    <td className="TableCell" title={props.value}>
      {props.value }
    </td>
  )
}

export default TableCell;
