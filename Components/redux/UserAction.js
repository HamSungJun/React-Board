import history from '../history/history.js'

export const A_SET_USER_INFO = "A_SET_USER_INFO"
export const A_USER_CLICK_WRITE = "A_USER_CLICK_WRITE"

export const AC_SET_USER_INFO = (userInfo) => {
    return {
        type : A_SET_USER_INFO,
        value : userInfo
    }
}

export const AC_USER_CLICK_WRITE = () => {

    history.push('/write')

    return {
        type : A_USER_CLICK_WRITE
    }

}