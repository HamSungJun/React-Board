import { SERVER_URL } from './GlobalURL.js'
import history from '../history/history.js'
import { AC_TOGGLE_MODAL } from './LoginAction.js'

export const A_TYPING_REGISTER_FORM = "A_TYPING_REGISTER_FORM"
export const A_TYPING_USERNAME = "A_TYPING_USERNAME"
export const A_TYPING_EMAIL = "A_TYPING_EMAIL"
export const A_TYPING_PASSWORD = "A_TYPING_PASSWORD"

export const A_ASSIGN_PROFILE_IMAGE = "A_ASSIGN_PROFILE_IMAGE"
export const A_SUBMIT_REGISTER_FORM = "A_SUBMIT_REGISTER_FORM"

export const A_SUBMIT_START = "A_SUBMIT_START"
export const A_SUBMIT_SUCCESS = "A_SUBMIT_SUCCESS"
export const A_SUBMIT_ERROR = "A_SUBMIT_ERROR"

export const A_CLEAR_REDUCER = "A_CLEAR_REDUCER"

export const AC_TYPING_REGISTER_FORM = (TYPE,VALUE,VALID) => {
  
  return {
    type : TYPE,
    value : VALUE,
    valid : VALID
  }

}

export const AC_ASSIGN_PROFILE_IMAGE = (BOOL , FILE_INFO) => {
  return {
    type : A_ASSIGN_PROFILE_IMAGE,
    value : BOOL,
    file : FILE_INFO
  }
}

export const AC_SUBMIT_REGISTER_FORM = () => {

  return (dispatch , getState) => {
    let SnapShot = getState()
    dispatch(AC_SUBMIT_START())
    fetch(`${SERVER_URL}/register/nonformalRegisterSubmit`,{
      method : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        USERNAME : SnapShot.register.USERNAME,
        EMAIL : SnapShot.register.EMAIL,
        PW : SnapShot.register.PW,
        FILENAME : SnapShot.register.FILENAME
      })
    }).then((response)=>(response.json())).then((Jres) => {

      if(Jres.status === 1){

        dispatch({
          type : A_SUBMIT_SUCCESS
        })
        // dispatch(AC_TOGGLE_MODAL())
        history.push('/')
      }
      else{
        dispatch(AC_SUBMIT_ERROR(Jres.mesg))
      }
      
    })
  }
}

export const AC_SUBMIT_START = () => {
 return {
   type : A_SUBMIT_START
 }
}

export const AC_SUBMIT_ERROR = (mesg) => {
  return {
    type : A_SUBMIT_ERROR,
    mesg : mesg
  }
}

export const AC_CLEAR_REDUCER = () => {
  return {
    type : A_CLEAR_REDUCER
  }
}






