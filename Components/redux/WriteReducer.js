import * as WriteActions from './WriteAction.js'

const writeInitialState = {
    HTML : ""
}

const writeReducer = ( state = writeInitialState , action ) => {

    switch(action.type){

        case WriteActions.A_USER_TYPING_EDITOR:
            return Object.assign({},state,{
                HTML : action.HTML
            })

        default :
            return state
    }

}

export default writeReducer