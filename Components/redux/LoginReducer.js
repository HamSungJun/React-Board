import * as LoginActions from './LoginAction.js'

const loginInitialState = {
  EMAIL : "",
  PW : "",
  REMEMBER : false,
  IS_AUTHORIZING : false,
  IS_AUTH_SUCCESS : false,
  IS_AUTH_ERROR : false,
  TOGGLE_MODAL : false,
  AUTH_ERROR_MESG : ""
}

const loginReducer = (state = loginInitialState , action) => {
  switch(action.type){
    case LoginActions.A_TYPING_LOGIN_FORM_EMAIL :
      return Object.assign({},state,{
        EMAIL : action.value
      })

    case LoginActions.A_TYPING_LOGIN_FORM_PW :
      return Object.assign({},state,{
        PW : action.value
      })

    case LoginActions.A_IS_REMEMBER_CHECKED :
      return Object.assign({},state,{
        REMEMBER : action.value
      })

    case LoginActions.A_SUBMIT_BUTTON_CLCICKED :
      return Object.assign({},state,{
        IS_AUTHORIZING : action.value
      })

    case LoginActions.A_AUTH_SUCCESS :
      return Object.assign({},state,{
        IS_AUTHORIZING : !(action.value),
        IS_AUTH_SUCCESS : action.value,
        AUTH_ERROR_MESG : ""
      })
    case LoginActions.A_AUTH_ERROR :
      return Object.assign({},state,{
        IS_AUTHORIZING : !(action.value),
        IS_AUTH_ERROR : action.value,
        AUTH_ERROR_MESG : action.mesg
      })
    case LoginActions.A_CLEAR_LOGIN :
      return Object.assign({},state,{
        IS_AUTHORIZING : action.value,
        IS_AUTH_SUCCESS : action.value,
        IS_AUTH_ERROR : action.value
      })
    case LoginActions.A_TOGGLE_MODAL :
      return Object.assign({},state,{
        TOGGLE_MODAL : !(state.TOGGLE_MODAL)
      })
    default : 
      return state
  }
}

export default loginReducer