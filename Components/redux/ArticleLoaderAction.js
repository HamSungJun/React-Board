import {SERVER_URL} from './GlobalURL.js'

export const A_LOAD_POSTINGS = "A_LOAD_POSTINGS"
export const A_LOAD_POSTINGS_DONE = "A_LOAD_POSTINGS_DONE"

export const AC_LOAD_INITIAL_POSTINGS = () => {

    return (dispatch,getState) => {

        dispatch({
            type : A_LOAD_POSTINGS,
            value : true
        })  

        let SnapShot = getState().articleLoader

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