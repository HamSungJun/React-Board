import * as WriteActions from './WriteAction.js'

const writeInitialState = {
    HTML : "",
    isEditing : true
}

const writeReducer = ( state = writeInitialState , action ) => {

    switch(action.type){

        case WriteActions.A_USER_TYPING_EDITOR:
            return Object.assign({},state,{
                HTML : action.HTML
            })
        case WriteActions.A_USER_TOGGLE_VIEW:
            return Object.assign({},state,{
                isEditing : action.value
            })
        default :
            return state
    }

}

export default writeReducer