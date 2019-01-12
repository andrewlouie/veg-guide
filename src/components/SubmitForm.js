import React from 'react';

function SubmitForm(props) { 
  return (
    <div className="SubmitForm">
      <label htmlFor="requestername">
        Your name (optional)
      </label>
      <input id="requestername" type="text" onChange={(evt) => props.changeSubmitForm('requesterName', evt.target.value)} value={props.requesterName} />
      <label htmlFor="requesteremail">
        Your email (optional / incase there are questions)
      </label>
      <input id="requesteremail" onChange={(evt) => props.changeSubmitForm('requesterEmail', evt.target.value)} type="text" value={props.requesterEmail} />
      <label htmlFor="notes">
        Notes (anything else we should know)
      </label>
      <input id="notes" type="text" onChange={(evt) => props.changeSubmitForm('notes', evt.target.value)} value={props.notes} />
      <div className="submitButtonContainer"><button onClick={props.submitInfo} className="submitButton">Send</button></div>
    </div>
  )
}

export default SubmitForm;
