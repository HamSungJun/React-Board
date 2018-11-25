import { A_TYPING_LOGIN_FORM_ID , A_TYPING_LOGIN_FORM_PW , A_IS_REMEMBER_CHECKED , A_SUBMIT_BUTTON_CLCICKED , A_AUTH_SUCCESS , A_AUTH_ERROR , A_CLEAR_LOGIN} from './LoginAction.js'

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

    case A_AUTH_SUCCESS :
      return Object.assign({},state,{
        IS_AUTHORIZING : !(action.value),
        IS_AUTH_SUCCESS : action.value
      })
    case A_AUTH_ERROR :
      return Object.assign({},state,{
        IS_AUTHORIZING : !(action.value),
        IS_AUTH_ERROR : action.value
      })
    case A_CLEAR_LOGIN :
      return Object.assign({},state,{
        IS_AUTHORIZING : action.value,
        IS_AUTH_SUCCESS : action.value,
        IS_AUTH_ERROR : action.value
      })

    default : 
      return state
  }
}

export default loginReducer