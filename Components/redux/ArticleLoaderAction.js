import {SERVER_URL} from './GlobalURL.js'

export const A_LOAD_POSTINGS = "A_LOAD_POSTINGS"
export const A_LOAD_POSTINGS_DONE = "A_LOAD_POSTINGS_DONE"
export const A_FILT_READABLE_DOCS = "A_FILT_READABLE_DOCS"
export const A_TITLE_SEARCH = "A_TITLE_SEARCH"
export const A_POST_EYE_UP = "A_POST_EYE_UP"
export const A_REFRESH_ARTICLE_LOAD_STATE = "A_REFRESH_ARTICLE_LOAD_STATE"

export const AC_LOAD_POSTINGS = () => {

    return (dispatch,getState) => {

        let SnapShot = getState().articleLoader

        if(SnapShot.IS_FETCHING){
            return
        }
    
        fetch(`${SERVER_URL}/read?skip=${SnapShot.SKIP}&limit=${SnapShot.LIMIT}`,{
            method : 'GET'
        })
        .then(res=>res.json())
        .then((res) => {
            if(res.status === 1){
                dispatch({
                    type : A_LOAD_POSTINGS_DONE,
                    value : res.payload
                })
            }
        })

    }

}

export const AC_FILT_READABLE_DOCS = (type,order) => {
    
    return (dispatch, getState) => {

        switch(`${type}.${order}`){

            case 'REPLY.RESET' :
            case 'REPLY.DOWN' :
                dispatch({
                    type : A_FILT_READABLE_DOCS,
                    value : FILT_ARRAY(getState().articleLoader.READABLE_DOCS,'POST_REPLY','DOWN')
                })
                break;
            case 'REPLY.UP' :
                dispatch({
                    type : A_FILT_READABLE_DOCS,
                    value : FILT_ARRAY(getState().articleLoader.READABLE_DOCS,'POST_REPLY','UP')
                })
                break;

            case 'EYE.RESET' :
            case 'EYE.DOWN' :
                dispatch({
                    type : A_FILT_READABLE_DOCS,
                    value : FILT_ARRAY(getState().articleLoader.READABLE_DOCS,'EYE','DOWN')
                })
                break;
            case 'EYE.UP' :
                dispatch({
                    type : A_FILT_READABLE_DOCS,
                    value : FILT_ARRAY(getState().articleLoader.READABLE_DOCS,'EYE','UP')
                })
                break;
            
            case 'THUMB.RESET' :
            case 'THUMB.DOWN' :
                dispatch({
                    type : A_FILT_READABLE_DOCS,
                    value : FILT_ARRAY(getState().articleLoader.READABLE_DOCS,'RECOMMEND','DOWN')
                })
                break;
            case 'THUMB.UP' :
                dispatch({
                    type : A_FILT_READABLE_DOCS,
                    value : FILT_ARRAY(getState().articleLoader.READABLE_DOCS,'RECOMMEND','UP')
                })
                break;
                
            case 'TIME.RESET' :
            case 'TIME.DOWN' :
                dispatch({
                    type : A_FILT_READABLE_DOCS,
                    value : FILT_ARRAY(getState().articleLoader.READABLE_DOCS,'POST_DATE','DOWN')
                })
                break;
            case 'TIME.UP' :
                dispatch({
                    type : A_FILT_READABLE_DOCS,
                    value : FILT_ARRAY(getState().articleLoader.READABLE_DOCS,'POST_DATE','UP')
                })
                break;
            
            default :
                break;

        }
    }
    
}

export const AC_TITLE_SEARCH = (searchText) => {
    
    let dispatchObject = {
        type : A_TITLE_SEARCH
    }

    return (dispatch,getState) => {

        if(searchText.length === 0){
            dispatchObject.value = getState().articleLoader.READABLE_DOCS
            dispatchObject.searching = false
        }
        else{
            dispatchObject.value = SEARCH_ARRAY(getState().articleLoader.READABLE_DOCS,searchText)
            dispatchObject.searching = true
        }

        dispatch(dispatchObject)

    }
    
}

export const SEARCH_ARRAY = (array,searchText) => {

    array.forEach((el) => {
        if(el.POST_TITLE.includes(searchText)){
            el.SEARCH_TOUCHED = true
        }
        else{
            el.SEARCH_TOUCHED = false
        }
    })

    return array

}

export const FILT_ARRAY = (array,key,direction) => {
    if(direction === 'UP'){
        return array.sort((a,b) => {
            if(Array.isArray(a[key])){
                return a[key].length - b[key].length
            } else {
                return a[key] - b[key]
            }
        })
    }
    else{
        return array.sort((a,b) => {
            if(Array.isArray(a[key])){
                return b[key].length - a[key].length
            } else {
                return b[key] - a[key]
            }
        })
    }
}

export const AC_POST_EYE_UP = (postId) => {

    return (dispatch) => {

        return fetch(`${SERVER_URL}/read/postEyeUp`,{
            method : 'PUT',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                targetArticleId : postId
            })

        }).then(res => res.json())
        .then(res => {
            if(res.status === 1){
                dispatch({
                    type : A_POST_EYE_UP,
                    value : res.payload
                })
            }
        })

    }

}

export const AC_REFRESH_ARTICLE_LOAD_STATE = () => {

    return {
        type : A_REFRESH_ARTICLE_LOAD_STATE
    }

}