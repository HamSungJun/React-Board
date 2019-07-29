import * as ArticleLoaderActions from './ArticleLoaderAction.js'

let ArticleLoaderInitialState = {
    IS_INITIAL_LOADING : false,
    SKIP : 0,
    LIMIT : 20,
    READABLE_DOCS : []
}

let ArticleLoaderReducer = (state = ArticleLoaderInitialState , action) => {

    switch(action.type){

        case ArticleLoaderActions.A_LOAD_POSTINGS :

            return Object.assign({},state,{
                IS_INITIAL_LOADING : action.value
            })

        case ArticleLoaderActions.A_LOAD_POSTINGS_DONE :

            return Object.assign({},state,{
                IS_INITIAL_LOADING : false,
                READABLE_DOCS : state.READABLE_DOCS.concat(action.value)
            })
        default :
            return state
    }

}

export default ArticleLoaderReducer

