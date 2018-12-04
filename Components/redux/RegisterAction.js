export const A_TYPING_REGISTER_FORM = "A_TYPING_REGISTER_FORM"
export const A_TYPING_USERNAME = "A_TYPING_USERNAME"
export const A_TYPING_EMAIL = "A_TYPING_EMAIL"
export const A_TYPING_PASSWORD = "A_TYPING_PASSWORD"

export const A_ASSIGN_PROFILE_IMAGE = "A_ASSIGN_PROFILE_IMAGE"
export const A_SUBMIT_REGISTER_FORM = "A_SUBMIT_REGISTER_FORM"

export const AC_TYPING_REGISTER_FORM = (TYPE,VALUE,VALID) => {
  
  return {
    type : TYPE,
    value : VALUE,
    valid : VALID
  }

}

export const AC_ASSIGN_PROFILE_IMAGE = (VALUE) => {
  return {
    type : A_ASSIGN_PROFILE_IMAGE,
    value : VALUE
  }
}

export const AC_SUBMIT_REGISTER_FORM = () => {
  // return (dispatch , getState) => {
  //   let SnapShot = getState()

  //   fetch('http://localhost:3000/register/nonformalRegisterForm',{
  //     method : 'POST',
  //     headers: {
  //       'Accept' : 'application/json',
  //       'Content-Type' : 'application/json'
  //     },
  //     body : JSON.stringify({
  //       USERNAME : SnapShot.register.USERNAME,
  //       EMAIL : SnapShot.register.EMAIL,
  //       PW : SnapShot.register.PW
  //     })
  //   }).then((response) => (response.json())).then((Jres) => {
  //     if(Jres.status === 1){
  //       dispatch({

  //       })
  //     }
  //     else{
  //       dispatch({
          
  //       })
  //     }
  //   })
  // }
}





