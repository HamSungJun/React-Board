import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import { MdAccountCircle } from 'react-icons/md';
import { AC_IS_REMEMBER_CHECKED , AC_TYPING_LOGIN_FORM , AC_LOGIN_PROCESS_START, AC_CLEAR_LOGIN} from '../redux/LoginAction.js'
import { Redirect , Link , withRouter } from 'react-router-dom'
import history from '../history/history'

import './Login.scss'

class Login extends React.Component{

  render(){
    return LoginProcess(this.props)
  }
  
}
const MoveToHome = (props) => {
  console.log(props)
}
const LoginProcess = (props) => (

<div className="Wrapper">

  <div className="Modal-Wrapper">

    <div className="Modal-Content">

      <div className="Modal-Header">
        <div className="Modal-Header__Block --Top-Left-Block">
          <span className="Modal-Header__Text">
          Register</span>
        </div>
        <div className="Modal-Header__Block --Top-Right-Block">
          <span className="Modal-Header__Text">
          Close</span>
        </div>
      </div>

      
      <div className="Modal-Body__Row">
        <div className="User_Img">
          <img src="./Images/unknown.png" alt="userimg"/>
        </div>
      </div>

      <div className="Modal-Footer">
      </div>

    </div>

  </div>


  <div className="LoginBox" >

    <div>

        <div className="User">
            <MdAccountCircle id="initialCircle" className="circle" size={120}/>
        </div>
        
        <div className="Header">
          <span className="Header__Text">Member Login</span>
        </div>
        
        <div>
    
          <div className="Input-Row">
            <input onChange={props.typing} className="Input-Row__Input" name="INPUT_ID" type="text" placeholder="Username"/>
          </div>

          <div className="Input-Row">
            <input onChange={props.typing} className="Input-Row__Input" name="INPUT_PW" type="password" placeholder="Password"/>
          </div>

          <div>
            <input checked={props.isChecked} onChange={props.remember} className="Input-Row__Left" type="checkbox" name="REMEMBER" /> <span className="Input-Row__Text">Remember</span> 
            <span  className="Input-Row__Right Input-Row__Text"><Link to="/home">Find ID/PW</Link></span>
          </div>

          
          
        </div>

        <div className="Button-Row">

          <div>
            <button onClick={props.submit} className="Button-Row__Button --Login-Button" type="button">Login</button>
          </div>

          <div>
            <button className="Button-Row__Button --Register-Button" type="button">Register</button>  
          </div>
          
        </div>

    </div>

  </div> 

</div>
)

const mapStateToProps = (state) => {
  return{
    isChecked : state.REMEMBER,
    isAuthorizing : state.IS_AUTHORIZING,
    isAuthSuccess : state.IS_AUTH_SUCCESS,
    isAuthError : state.IS_AUTH_ERROR,
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return{
    remember(event){
      dispatch(AC_IS_REMEMBER_CHECKED(event.target.checked))
    },
    typing(event){

      if(event.target.value.length > 0){
        event.target.classList.add('--ShadowBorder');
      }
      else{
        event.target.classList.remove('--ShadowBorder')
      }

      dispatch(AC_TYPING_LOGIN_FORM(event.target.name,event.target.value))
    },
    submit(){

      dispatch(AC_LOGIN_PROCESS_START())
      setTimeout(()=>{
        dispatch(AC_CLEAR_LOGIN())
      },1000)
    }
  }
  
}

Login = withRouter(connect(mapStateToProps , mapDispatchToProps)(Login))

export default Login