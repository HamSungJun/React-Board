import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { SERVER_URL } from '../redux/GlobalURL.js'

import * as LoginActions from '../redux/LoginAction.js'

import './Home.scss'
import TopBar from './TopBar.jsx'
import ArticleLoader from './ArticleLoader.jsx'
import ArticleFilter from './ArticleFilter.jsx'

class Home extends React.Component{

  render(){

    return(
      <div className="Wrapper --Home --Bg-lightash">

        <TopBar />
        
        <div className="Home-Grid-Container">

          <div className="Home-Grid-Container__Item">
            <ArticleFilter />
          </div>
          <div className="Home-Grid-Container__Item">
            <ArticleLoader />
          </div>
          <div className="Home-Grid-Container__Item">
            
          </div>
        </div>
      </div>
    )
  }
}



export default withRouter(Home)