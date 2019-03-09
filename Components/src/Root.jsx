import React from 'react';
import ReactDOM from 'react-dom'
import { Router , Route , Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import _store from '../redux/_store.js'
import _history from '../history/history.js'

import Login from './Login.jsx'
import Home from './Home.jsx'
import Write from './Write.jsx'

import '../Styles/Share.scss'

class Root extends React.Component{

  render(){
    return(
      <Provider store={_store}>

        <Router history={_history}>

          <div>
            <Switch>

              <Route exact path="/" component={Login} ></Route>
              <Route path="/home" component={Home} ></Route>
              <Route path="/write" component={Write}></Route>
              
            </Switch>
          </div>

        </Router>

      </Provider>
    )
  }

}

ReactDOM.render(<Root />,document.getElementById('root'))