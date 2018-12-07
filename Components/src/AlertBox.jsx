import React from 'react'

import './AlertBox.scss'

const AlertBox = (props) => {
  return(
    <div className="AlertBox">
      <p className={"AlertBox AlertBox__Text "+(`--${props.alertType}`)}>{props.text}</p>
    </div>
  )
}

export default AlertBox