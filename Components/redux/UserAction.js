export const A_SET_USER_INFO = "A_SET_USER_INFO"

export const AC_SET_USER_INFO = (userInfo) => {
    return {
        type : A_SET_USER_INFO,
        value : userInfo
    }
}