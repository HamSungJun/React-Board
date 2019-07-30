import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { SERVER_URL } from '../redux/GlobalURL.js'
import { AC_LOAD_INITIAL_POSTINGS } from '../redux/ArticleLoaderAction.js'
import * as LoginActions from '../redux/LoginAction.js'
import _store from '../redux/_store.js'

import './Home.scss'
import TopBar from './TopBar.jsx'
import ArticleLoader from './ArticleLoader.jsx'
import ArticleFilter from './ArticleFilter.jsx'

class Home extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(this.props.location.state.reload === true){
      _store.dispatch(AC_LOAD_INITIAL_POSTINGS())
    }
  }

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