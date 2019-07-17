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

export const AC_SET_EMAIL_BY_COOKIE = (cookie_email) => {
  return {
    type : A_SET_EMAIL_BY_COOKIE,
    value : cookie_email
  }
}

export const AC_TOGGLE_MODAL = () => {
  return {
    type : A_TOGGLE_MODAL
  }
}

export const refreshSessionStroage = (userInfo) => {

  window.sessionStorage.removeItem('USERNAME')
  window.sessionStorage.removeItem('U_IMG_PATH')
  window.sessionStorage.removeItem('REG_DATE')
  window.sessionStorage.removeItem('NUM_OF_ARTICLES')
  window.sessionStorage.removeItem('NUM_OF_REPLIES')
  window.sessionStorage.removeItem('NUM_OF_GOTTEN_RECOMMENDS')
  window.sessionStorage.removeItem('NUM_OF_HIT_RECOMMENS')
  window.sessionStorage.removeItem('EMAIL')

  window.sessionStorage.setItem('USERNAME',userInfo.USERNAME)
  window.sessionStorage.setItem('U_IMG_PATH',userInfo.U_IMG_PATH)
  window.sessionStorage.setItem('REG_DATE',userInfo.REG_DATE)
  window.sessionStorage.setItem('NUM_OF_ARTICLES',userInfo.NUM_OF_ARTICLES)
  window.sessionStorage.setItem('NUM_OF_REPLIES',userInfo.NUM_OF_REPLIES)
  window.sessionStorage.setItem('NUM_OF_GOTTEN_RECOMMENDS',userInfo.NUM_OF_GOTTEN_RECOMMENDS)
  window.sessionStorage.setItem('NUM_OF_HIT_RECOMMENS',userInfo.NUM_OF_HIT_RECOMMENS)
  window.sessionStorage.setItem('EMAIL',userInfo.EMAIL)
  
}

export const removeSessionStorage = () => {

  window.sessionStorage.removeItem('USERNAME')
  window.sessionStorage.removeItem('U_IMG_PATH')
  window.sessionStorage.removeItem('REG_DATE')
  window.sessionStorage.removeItem('NUM_OF_ARTICLES')
  window.sessionStorage.removeItem('NUM_OF_REPLIES')
  window.sessionStorage.removeItem('NUM_OF_GOTTEN_RECOMMENDS')
  window.sessionStorage.removeItem('NUM_OF_HIT_RECOMMENS')
  window.sessionStorage.removeItem('EMAIL')

}