import history from '../history/history.js'

export const A_TYPING_LOGIN_FORM_ID = "A_TYPING_LOGIN_FORM_ID"
export const A_TYPING_LOGIN_FORM_PW = "A_TYPING_LOGIN_FORM_PW"
export const A_IS_REMEMBER_CHECKED = "A_IS_REMEMBER_CHECKED"

export const A_SUBMIT_BUTTON_CLCICKED ="A_SUBMIT_BUTTON_CLCICKED"
export const A_AUTH_SUCCESS = "A_AUTH_SUCCESS"
export const A_AUTH_ERROR = "A_AUTH_ERROR"
export const A_CLEAR_LOGIN = "A_CLEAR_LOGIN"

export const AC_TYPING_LOGIN_FORM = (TargetName , TargetValue) => {

  if(TargetName === "INPUT_ID"){
    return {
      type : A_TYPING_LOGIN_FORM_ID,
      value : TargetValue
    }
  }
  else{
    return {
      type : A_TYPING_LOGIN_FORM_PW,
      value : TargetValue
    }
  }
}

export const AC_IS_REMEMBER_CHECKED = (CHECK) => {

  return{
    type : A_IS_REMEMBER_CHECKED,
    value : CHECK 
  }

}

export const AC_LOGIN_PROCESS_START = () => {

    // 서버쪽으로 ID , PW를 전달하여 Auth 진행.
    // 성공시 클라이언트 사이드 라우팅으로 홈으로 이동
    // 에러 발생시 로그인 박스 테두리를 붉게 만듬.
  history.push('/')
  return (dispatch , getState) => {
    dispatch({
      type : A_SUBMIT_BUTTON_CLCICKED,
      value : true
    })

    let SnapShot = getState();
  
    fetch('http://localhost:3000/login',{
      method : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        ID : SnapShot.ID,
        PW : SnapShot.PW,
        REMEMBER : SnapShot.REMEMBER
      })
    }).then((response) => (response.json())).then((Jres) => {
      if(Jres.status === 1){
        dispatch({
          type : A_AUTH_SUCCESS,
          value : true
        })
        
        history.push('/home')
      }
      else{
        dispatch({
          type : A_AUTH_ERROR,
          value : true
        })
      }
    })
    
  }
}

export const AC_CLEAR_LOGIN = () => {
  return {
    type : A_CLEAR_LOGIN,
    value : false
  }
}