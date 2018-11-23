import { A_TYPING_LOGIN_FORM_ID , A_TYPING_LOGIN_FORM_PW , A_IS_REMEMBER_CHECKED , A_SUBMIT_BUTTON_CLCICKED} from './LoginAction.js'

const loginInitialState = {
  ID : "",
  PW : "",
  REMEMBER : false,
  IS_AUTHORIZING : false,
  IS_AUTH_SUCCESS : false,
  IS_AUTH_ERROR : false
}

const loginReducer = (state = loginInitialState , action) => {
  switch(action.type){
    case A_TYPING_LOGIN_FORM_ID :
      return Object.assign({},state,{
        ID : action.value
      })

    case A_TYPING_LOGIN_FORM_PW :
      return Object.assign({},state,{
        PW : action.value
      })

    case A_IS_REMEMBER_CHECKED :
      return Object.assign({},state,{
        REMEMBER : action.value
      })

    case A_SUBMIT_BUTTON_CLCICKED :
      return Object.assign({},state,{
        IS_AUTHORIZING : action.value
      })

    default : 
      return state
  }
}

export default loginReducer