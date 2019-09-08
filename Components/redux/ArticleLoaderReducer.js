import * as ArticleLoaderActions from './ArticleLoaderAction.js'

let ArticleLoaderInitialState = {
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
                IS_FETCHING : true
            })

        case ArticleLoaderActions.A_LOAD_POSTINGS_DONE :

            return Object.assign({},state,{
                IS_FETCHING : false,
                READABLE_DOCS : state.READABLE_DOCS.concat(action.value),
                SKIP : state.SKIP + state.LIMIT
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

        case ArticleLoaderActions.A_POST_EYE_UP :

            return Object.assign({},state,{
                READABLE_DOCS : updateReadableDocs(state.READABLE_DOCS,action.value)
            })

        case ArticleLoaderActions.A_REFRESH_ARTICLE_LOAD_STATE : 

            return Object.assign({},ArticleLoaderInitialState)

        default :
            return state
    }

}

const updateReadableDocs = (origin,newDoc) => {

    origin[origin.findIndex(el => el._id === newDoc._id)] = newDoc
    return origin

}

export default ArticleLoaderReducer

