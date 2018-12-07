import React from 'react'
import { withRouter } from 'react-router-dom'

class Home extends React.Component{
  render(){
    
    return(
      <div className="wrapper">
        <h3>홈에 도착</h3>
      </div>
    )
  }
}

export default withRouter(Home) 