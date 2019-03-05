import * as RegisterActions from './RegisterAction.js'

const registerInitialState = {

  USERNAME : "",
  EMAIL : "",
  PW : "",
  FILENAME : "",
  IS_IMG_ASSIGNED : false,
  IS_VALID_NAME : false,
  IS_VALID_EMAIL : false,
  IS_VALID_PW : false,
  IS_SUBMITTING : false,
  IS_SUBMIT_SUCCESS : false,
  IS_SUBMIT_ERROR : false,
  SUBMIT_ERROR_MESG : ""
  
}

const registerReducer = (state = registerInitialState , action) => {

  switch(action.type){

    case RegisterActions.A_TYPING_USERNAME :
      return Object.assign({},state,{
        USERNAME : action.value,
        IS_VALID_NAME : action.valid,
      })

    case RegisterActions.A_TYPING_EMAIL : 
      return Object.assign({},state,{
        EMAIL : action.value,
        IS_VALID_EMAIL : action.valid,
      })

    case RegisterActions.A_TYPING_PASSWORD : 
      return Object.assign({},state,{
        PW : action.value,
        IS_VALID_PW : action.valid,
      })

    case RegisterActions.A_ASSIGN_PROFILE_IMAGE : 
      return Object.assign({},state,{
        FILENAME : action.file,
        IS_IMG_ASSIGNED : action.value,
      })

    case RegisterActions.A_SUBMIT_START :
      return Object.assign({},state,{
        IS_SUBMITTING : true
      })

    case RegisterActions.A_SUBMIT_SUCCESS :
      return Object.assign({},state,{
        IS_SUBMITTING : false,
        IS_SUBMIT_SUCCESS : true,
      })

    case RegisterActions.A_SUBMIT_ERROR :
      return Object.assign({},state,{
        USERNAME : "",
        EMAIL : "",
        PW : "",
        FILENAME : "",
        IS_IMG_ASSIGNED : false,
        IS_VALID_NAME : false,
        IS_VALID_EMAIL : false,
        IS_VALID_PW : false,
        IS_SUBMITTING : false,
        IS_SUBMIT_SUCCESS : false,
        IS_SUBMIT_ERROR : true,
        SUBMIT_ERROR_MESG : action.mesg
    })

    case RegisterActions.A_CLEAR_REDUCER : 
    
      return Object.assign({},state,{
        ...registerInitialState
      })

    default :
      return state

  }

}

export default registerReducer