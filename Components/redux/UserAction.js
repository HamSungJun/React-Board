
import { SERVER_URL } from './GlobalURL.js'
import { refreshSessionStroage } from './LoginAction.js'

export const A_SET_USER_INFO = "A_SET_USER_INFO"
export const A_USER_CLICK_WRITE = "A_USER_CLICK_WRITE"
export const A_GET_SESSION_DATA = "AC_GET_SESSION_DATA"


export const AC_SET_USER_INFO = (userInfo) => {
    return refreshSessionStroage(userInfo)
}

export const AC_GET_SESSION_DATA = (sid) => {

    return (dispatch) => {

        fetch(`${SERVER_URL}/login/getSessionData`,{
            method : `POST`,
            credentials : `include`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                SID : sid
            })
        }).then(response => (response.json())).then((Jres) => {
            
            if(Jres.status === 1){

                dispatch(AC_SET_USER_INFO(Jres))

            }

        })

    }

}