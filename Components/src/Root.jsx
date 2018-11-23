import React from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import _store from '../redux/_store.js'

import Login from './Login.jsx'

import '../Styles/Share.scss'

class Root extends React.Component{

  render(){
    return(
      <Provider store={_store}>

        <Router>

          <div>
            <Switch>
              <Route exact path="/" component={Login} ></Route>
              {/* <Route path="/register" component={Register} ></Route>
              <Route path="/find" component={Find} ></Route>
              <Route path="/home" component={Home} ></Route>
              <Route component={} ></Route> */}
            </Switch>
          </div>

        </Router>

      </Provider>
    )
  }

}

ReactDOM.render(<Root />,document.getElementById('root'))