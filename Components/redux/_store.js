import { createStore , applyMiddleware , combineReducers } from 'redux'

import loginReducer from './LoginReducer.js'
import registerReducer from './RegisterReducer.js'
import userReducer from './UserReducer.js'
import writeReducer from './WriteReducer.js';

import logger from 'redux-logger'
import thunk from 'redux-thunk'


let originReducer = combineReducers({
    login : loginReducer,
    register : registerReducer,
    write : writeReducer
})
let _store = createStore(originReducer , applyMiddleware(logger , thunk))

export default _store