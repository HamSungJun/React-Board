import * as WriteActions from './WriteAction.js'

const writeInitialState = {

    ViewState : true,
    MediaState : true

}

const writeReducer = ( state = writeInitialState , action ) => {

    switch(action.type){

        case WriteActions.A_CHANGE_MEDIA_MODE :
            return Object.assign({},state,{
                MediaState: action.value
            })
        case WriteActions.A_CHANGE_VIEW_MODE :
            return Object.assign({},state,{
                ViewState: action.value
            })

        default :
            return state
    }

}

export default writeReducer
