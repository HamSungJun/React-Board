export const A_USER_TYPING_EDITOR = "A_USER_TYPING_EDITOR"
export const A_USER_TOGGLE_VIEW = "A_USER_TOGGLE_VIEW"
export const A_USER_TYPING_ENTER = "A_USER_TYPING_ENTER"


export const AC_USER_TYPING_EDITOR = (HTML) => {
    return {
        type : A_USER_TYPING_EDITOR,
        HTML : HTML
    }
}

export const AC_USER_TOGGLE_VIEW = (view) => {

    let viewState;

    if(view === "Editor"){
        viewState = true
    }
    else{
        viewState = false
    }

    return {
        type : A_USER_TOGGLE_VIEW,
        value : viewState 
    }

}

export const AC_USER_TYPING_ENTER = () => {

    return {
        type : A_USER_TYPING_ENTER
    }

}

