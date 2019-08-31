import * as ArticleLoaderActions from './ArticleLoaderAction.js'

let ArticleLoaderInitialState = {
    IS_INITIAL_LOADING : false,
    IS_FETCHING : false,
    IS_SEARCHING : false,
    SKIP : 0,
    LIMIT : 20,
    READABLE_DOCS : [],
}

let ArticleLoaderReducer = (state = ArticleLoaderInitialState , action) => {

    switch(action.type){

        case ArticleLoaderActions.A_LOAD_POSTINGS :

            return Object.assign({},state,{
                IS_INITIAL_LOADING : action.value,
                IS_FETCHING : true
            })

        case ArticleLoaderActions.A_LOAD_POSTINGS_DONE :

            return Object.assign({},state,{
                IS_INITIAL_LOADING : false,
                IS_FETCHING : false,
                READABLE_DOCS : state.READABLE_DOCS.concat(action.value),
                SKIP : state.SKIP + state.LIMIT,
            })

        case ArticleLoaderActions.A_FILT_READABLE_DOCS : 

            return Object.assign({},state,{
                READABLE_DOCS : action.value
            })

        case ArticleLoaderActions.A_TITLE_SEARCH :

            return Object.assign({},state,{
                READABLE_DOCS : action.value,
                IS_SEARCHING : action.searching
            })

        default :
            return state
    }

}

export default ArticleLoaderReducer

