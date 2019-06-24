export const A_CHANGE_VIEW_MODE = 'A_CHANGE_VIEW_MODE'
export const A_CHANGE_MEDIA_MODE = 'A_CHANGE_MEDIA_MODE'

export const AC_CHANGE_VIEW_MODE = (mode) => {

    if(mode){
        return {
            type : A_CHANGE_VIEW_MODE,
            value : mode
        }
    }
    else{
        return {
            type: A_CHANGE_VIEW_MODE,
            value: mode
        }
    }


}
export const AC_CHANGE_MEDIA_MODE = (mode) => {

    if(mode){
        return {
            type : A_CHANGE_MEDIA_MODE,
            value : mode
        }
    }
    else{
        return {
            type: A_CHANGE_MEDIA_MODE,
            value: mode
        }
    }


}