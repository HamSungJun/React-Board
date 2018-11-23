import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ScaleLoader } from 'react-spinners'
import { MdAccountCircle } from 'react-icons/md';
import { AC_IS_REMEMBER_CHECKED , AC_TYPING_LOGIN_FORM , AC_LOGIN_PROCESS_START} from '../redux/LoginAction.js'
import { Link } from 'react-router-dom'

import './Login.scss'
class Login extends React.Component{
  componentDidMount(){
    
  }
  render(){
    return(
      <div className="Wrapper">
        <div className="LoginBox">
            
            <div className="User">
             
                <MdAccountCircle id="circle" className="circle" size={120}/>
              
            </div>
            
            <div className="Header">
              <span className="Header__Text">Member Login</span>
            </div>
            
            <div>

              <div className="Input-Row">
                <input onChange={this.props.typing} className="Input-Row__Input" name="INPUT_ID" type="text" placeholder="Username"/>
              </div>

              <div className="Input-Row">
                <input onChange={this.props.typing} className="Input-Row__Input" name="INPUT_PW" type="password" placeholder="Password"/>
              </div>

              <div>
                <input checked={this.props.isChecked} onChange={this.props.remember} className="Input-Row__Check" type="checkbox" name="REMEMBER" /> <span className="Input-Row__Text">Remember</span> 
                <span  className="Input-Row__Find Input-Row__Text"><Link to="/home">Find ID/PW</Link></span>
              </div>

            </div>

            <div className="Button-Row">

              <div>
                <button className="Button-Row__Button" type="button">Login</button>
              </div>
              
            </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    isChecked : state.REMEMBER
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
    }
  }
  
}

Login = connect(mapStateToProps , mapDispatchToProps)(Login)

export default Login