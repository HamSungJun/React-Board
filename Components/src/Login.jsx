import React from 'react'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as loginActions from '../redux/LoginAction.js'
import * as registerActions from '../redux/RegisterAction.js'

import { RegisterBox } from './RegisterBox.jsx'
import { LoginBox } from './LoginBox.jsx'

import './Login.scss'

let USERNAME_REGEX = /^[가-힣a-zA-Z0-9\_\-]{2,12}$/
let EMAIL_REGEX = /^[a-z0-9\_\-]+\@[a-z]+(\.[a-z]{2,3}){1,2}$/
let PW_REGEX = /^[a-zA-Z0-9\!\@\#\$\%\^\&\*]{8,12}$/

const VALIDATOR = (REGEX,VALUE) => {
  
  return REGEX.test(VALUE)

}

class Login extends React.Component{

  componentDidMount(){
    
    let INPUT_ID = document.getElementById("INPUT_ID__LOGIN")
    let cookieData = Cookies.get('user');
    if(cookieData == 'undefined'){
      INPUT_ID.value = ""
    }
    else{
      INPUT_ID.value = Cookies.get('user')
    }
    
    
  }

  render(){
    
    const { loginState , loginDispatch } = this.props

    return(
      <div className="Wrapper --Bg-lightash --Login ">
        {RegisterBox(this.props)}
        {LoginBox(loginState , loginDispatch)}
      </div>
    )
  }
  
}
 
const mapStateToProps = (state) => {
  
  return{
    loginState : state.login,
    registerState : state.register
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return{
    loginDispatch : {
      modal(bool = false){
        if(bool){
          dispatch(loginActions.AC_TOGGLE_MODAL())
          dispatch(registerActions.AC_CLEAR_REDUCER());
        }
        else{
          dispatch(loginActions.AC_TOGGLE_MODAL())
        }
      },
      remember(event){
        dispatch(loginActions.AC_IS_REMEMBER_CHECKED(event.target.checked))
      },
      loginTyping(event){
  
        if(event.target.value.length > 0){
          event.target.classList.add('--ShadowBorder');
        }
        else{
          event.target.classList.remove('--ShadowBorder')
        }
  
        dispatch(loginActions.AC_TYPING_LOGIN_FORM(event.target.name,event.target.value))
      },
      loginSubmit(event){

        if(event.target.id == "LOGIN_BTN"){
          dispatch(loginActions.AC_LOGIN_PROCESS_START())
        }
        if(event.keyCode == 13){
          dispatch(loginActions.AC_LOGIN_PROCESS_START())
        }
        
      },
    },
    registerDispatch : {

      registerTyping(event){
        
        let NAME = event.target.name
        let VALUE = event.target.value

        switch(NAME){

          case "USERNAME" :

            return dispatch(
                  registerActions.AC_TYPING_REGISTER_FORM(
                    registerActions.A_TYPING_USERNAME,
                    VALUE,
                    VALIDATOR(USERNAME_REGEX,VALUE)
                  )
                )

          case "EMAIL" :

            return dispatch(
                  registerActions.AC_TYPING_REGISTER_FORM(
                    registerActions.A_TYPING_EMAIL,
                    VALUE,
                    VALIDATOR(EMAIL_REGEX,VALUE)
                  )
                )

          case "PASSWORD" :

            return dispatch(
                  registerActions.AC_TYPING_REGISTER_FORM(
                    registerActions.A_TYPING_PASSWORD,
                    VALUE,
                    VALIDATOR(PW_REGEX,VALUE)
                  )
                )

        }

      },
      registerSubmit(){
        dispatch(registerActions.AC_SUBMIT_REGISTER_FORM())
        
      },
      imageFlush(bool = false , file = {}){
        dispatch(registerActions.AC_ASSIGN_PROFILE_IMAGE(false , {}))
      },
      imageAlloc(bool = true , FILE_INFO){
        dispatch(registerActions.AC_ASSIGN_PROFILE_IMAGE(bool , FILE_INFO))
      }

    }
  }
  
}

Login = withRouter(connect(mapStateToProps , mapDispatchToProps)(Login))

export default Login