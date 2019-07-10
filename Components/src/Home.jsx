import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { SERVER_URL } from '../redux/GlobalURL.js'

import * as LoginActions from '../redux/LoginAction.js'

import './Home.scss'
import TopBar from './TopBar.jsx'

class Home extends React.Component{

  render(){

    return(
      <div className="Wrapper --Home --Bg-lightash">

        <TopBar />
        
      </div>
    )
  }
}



export default withRouter(Home)