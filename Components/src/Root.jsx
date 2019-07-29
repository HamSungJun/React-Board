import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AC_GET_SESSION_DATA } from '../redux/UserAction.js'
import { Redirect } from 'react-router-dom'

import _store from '../redux/_store.js'

import Login from './Login.jsx'
import Home from './Home.jsx'
import Write from './Write.jsx'
import ArticleView from './ArticleView.jsx'
import NotFound from './NotFound.jsx'

import '../Styles/Share.scss'
import Cookies from "js-cookie";

class Root extends React.Component{

  render(){
    return(
      <Provider store={_store}>

        <Router>

          <div>
            <Switch>

              <Route exact path="/" component={Login} ></Route>
              <Route path="/home" render={()=>{
                return RouteDecision(Home)
              }}></Route>
              <Route path="/write" render={()=>{
                return RouteDecision(Write)
              }}></Route>
              <Route path="/view" render={()=>{
                return RouteDecision(ArticleView)
              }}></Route>
              <Route component={NotFound}></Route>

            </Switch>
          </div>

        </Router>

      </Provider>
    )
  }

}

const RouteDecision = (component) => {

  return window.sessionStorage.getItem('EMAIL') !== null ? (<Route component={component} />) : (<Redirect to="/" />)

}

ReactDOM.render(<Root />,document.getElementById('root'))
