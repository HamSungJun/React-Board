import history from '../history/history.js'
import { SERVER_URL , CLIENT_URL } from './GlobalURL.js';
import Cookies from 'js-cookie'

import { AC_SET_USER_INFO } from './UserAction.js'

export const A_TYPING_LOGIN_FORM_EMAIL = "A_TYPING_LOGIN_FORM_EMAIL"
export const A_TYPING_LOGIN_FORM_PW = "A_TYPING_LOGIN_FORM_PW"
export const A_IS_REMEMBER_CHECKED = "A_IS_REMEMBER_CHECKED"

export const A_SUBMIT_BUTTON_CLCICKED ="A_SUBMIT_BUTTON_CLCICKED"
export const A_AUTH_SUCCESS = "A_AUTH_SUCCESS"
export const A_AUTH_ERROR = "A_AUTH_ERROR"
export const A_CLEAR_LOGIN = "A_CLEAR_LOGIN"

export const A_TOGGLE_MODAL = "A_TOGGLE_MODAL"

export const A_SET_EMAIL_BY_COOKIE = "A_SET_EMAIL_BY_COOKIE"
export const A_USER_LOGOUT = "A_USER_LOGOUT"

export const AC_TYPING_LOGIN_FORM = (TargetName , TargetValue) => {

  if(TargetName === "INPUT_ID"){
    return {
      type : A_TYPING_LOGIN_FORM_EMAIL,
      value : TargetValue
    }
  }
  else{
    return {
      type : A_TYPING_LOGIN_FORM_PW,
      value : TargetValue
    }
  }
}

export const AC_IS_REMEMBER_CHECKED = (CHECK) => {

  return{
    type : A_IS_REMEMBER_CHECKED,
    value : CHECK 
  }

}

export const AC_LOGIN_PROCESS_START = () => {

    // 서버쪽으로 ID , PW를 전달하여 Auth 진행.
    // 성공시 클라이언트 사이드 라우팅으로 홈으로 이동
    // 에러 발생시 로그인 박스 테두리를 붉게 만듬.
  history.push('/')
  return (dispatch , getState) => {
    dispatch({
      type : A_SUBMIT_BUTTON_CLCICKED,
      value : true
    })

    let SnapShot = getState();
  
    fetch(`${SERVER_URL}/login`,{
      method : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        EMAIL : SnapShot.login.EMAIL,
        PW : SnapShot.login.PW,
      })
    }).then((response) => (response.json())).then((Jres) => {
      if(Jres.status === 1){

        dispatch({
          type : A_AUTH_SUCCESS,
          value : true
        })
        
        dispatch(AC_SET_USER_INFO(Jres))

        if(SnapShot.login.REMEMBER){

          Cookies.set('user',Jres.EMAIL,{
            expires : 7,
            path : CLIENT_URL
          })

        }
      
        history.push('/home')
        
      }
      else{
        dispatch({
          type : A_AUTH_ERROR,
          mesg : Jres.mesg,
          value : true
        })
      }
    })
    
  }
}

export const AC_SET_EMAIL_BY_COOKIE = (cookie_email) => {
  return {
    type : A_SET_EMAIL_BY_COOKIE,
    value : cookie_email
  }
}

export const AC_USER_LOGOUT = () => {

  // 서버와 연결된 세션 폐기 , 스토어 Login 값 폐기
  history.push('/')

  return {
      type : "A_USER_LOGOUT"
  }

}

export const AC_CLEAR_LOGIN = () => {
  return {
    type : A_CLEAR_LOGIN,
    value : false
  }
}

export const AC_TOGGLE_MODAL = () => {
  return {
    type : A_TOGGLE_MODAL
  }
}