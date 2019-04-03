import * as UserActions from './UserAction.js'

const userInitialState = {

    USERNAME : "Unknown",
    U_IMG_PATH : "",
    REG_DATE : "",
    NUM_OF_ARTICLES : 0,
    NUM_OF_REPLIES : 0,
    NUM_OF_GOTTEN_RECOMMENDS : 0,
    NUM_OF_HIT_RECOMMENS : 0,
    IS_SESSION_SUCCESS : false
}

const userReducer = (state = userInitialState , action) => {

    switch(action.type){

        case UserActions.A_SET_USER_INFO :
        return Object.assign({},state,{
            
            USERNAME : action.value.USERNAME,
            U_IMG_PATH : action.value.U_IMG_PATH,
            REG_DATE : action.value.REG_DATE,
            NUM_OF_ARTICLES : action.value.NUM_OF_ARTICLES,
            NUM_OF_REPLIES : action.value.NUM_OF_REPLIES,
            NUM_OF_GOTTEN_RECOMMENDS : action.value.NUM_OF_GOTTEN_RECOMMENDS,
            NUM_OF_HIT_RECOMMENS : action.value.NUM_OF_HIT_RECOMMENS,
            IS_SESSION_SUCCESS : true
        })

        default :
        return state
    }

}

export default userReducer