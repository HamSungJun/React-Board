import * as Actions from './RegisterAction.js'

const registerInitialState = {

  USERNAME : "",
  EMAIL : "",
  PW : "",
  SUBMIT_DISABLED : true,
  IS_IMG_ASSIGNED : false,
  IS_VALID_NAME : false,
  IS_VALID_EMAIL : false,
  IS_VALID_PW : false,
  IS_SUBMITTING : false,
  IS_SUBMIT_SUCCESS : false,
  IS_SUBMIT_ERROR : false,

}

const registerReducer = (state = registerInitialState , action) => {

  switch(action.type){

    case Actions.A_TYPING_USERNAME :
      return Object.assign({},state,{
        USERNAME : action.value,
        IS_VALID_NAME : action.valid
      })
    case Actions.A_TYPING_EMAIL : 
      return Object.assign({},state,{
        EMAIL : action.value,
        IS_VALID_EMAIL : action.valid
      })
    case Actions.A_TYPING_PASSWORD : 
      return Object.assign({},state,{
        PW : action.value,
        IS_VALID_PW : action.valid
      })
    case Actions.A_ASSIGN_PROFILE_IMAGE : 
      return Object.assign({},state,{
        IS_IMG_ASSIGNED : action.value
      })
    
    default :
      return state

  }

}

export default registerReducer