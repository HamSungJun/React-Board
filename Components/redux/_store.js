import {createStore , applyMiddleware} from 'redux'
import loginReducer from './LoginReducer.js'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

let _store = createStore(loginReducer , applyMiddleware(logger , thunk));

export default _store