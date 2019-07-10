import React from 'react'
import { BeatLoader } from 'react-spinners'
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom'

import { SERVER_URL , CLIENT_URL } from '../redux/GlobalURL.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { refreshSessionStroage } from '../redux/LoginAction.js'
import Cookies from 'js-cookie'
import { sha3_256 } from 'js-sha3'

class LoginBox extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      LOGIN_ID : "",
      LOGIN_PW : "",
      IS_AUTHORIZING : false,
      REMEMBER : false
    }

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
    this.handleFormInput = this.handleFormInput.bind(this)

  }

  componentWillMount(){
    if(Cookies.get('user')){
      this.setState({
        LOGIN_ID : Cookies.get('user')
      })
    }
  }

  handleLoginSubmit(event){

    event.preventDefault()

    if(event.target.id === "LOGIN_BTN" || event.keyCode === 13){

      this.setState({
        IS_AUTHORIZING : true
      })

      fetch(`${SERVER_URL}/login`,{
        method : 'POST',
        credentials : `include`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          EMAIL : document.getElementById('INPUT_ID__LOGIN').value,
          PW : document.getElementById('INPUT_PW__LOGIN').value
        })
      }).then((response) => (response.json())).then((Jres) => {
        if(Jres.status === 1){

          console.log(`로그인 성공 : ${Jres}`)
          refreshSessionStroage(Jres)
          
          this.props.history.push(`/home?user=${sha3_256(window.sessionStorage.EMAIL)}`)

          if(this.state.REMEMBER){
  
            Cookies.set('user',Jres.EMAIL,{
              expires : 7,
              path : CLIENT_URL
            })
  
          }
  
          Cookies.set('SID',Jres.SID,{
            expires : 7,
            path : CLIENT_URL
          })
  
        }
        else{
          alert('로그인 실패')
          this.setState({
            IS_AUTHORIZING : false
          })
        }

      })

     

    }
    
  }

  handleFormInput(event){

    if(event.target.id === "INPUT_ID__LOGIN"){
      this.setState({
        LOGIN_ID : event.target.value
      })
    }
    else if(event.target.id === "INPUT_PW__LOGIN"){
      this.setState({
        LOGIN_PW : event.target.value
      })
    }
    else if(event.target.id === "REMEMBER"){
      this.setState({
        REMEMBER : !this.state.REMEMBER
      },()=>{
        console.log(this.state)
      })
    }

  }

  render(){

    let {loginState , loginDispatch} = this.props

    return(
        <div className="LoginBox" >

    <div>

        <div className="User">
            <MdAccountCircle id="initialCircle" className="circle" size={120}/>
        </div>

        <div>
          {!this.state.IS_AUTHORIZING?
          (
            <div>
              <div className="Header">
                <span className="Header__Text">Member Login</span>
              </div>
              
              <div>
          
                <div className="Input-Row">
                  <input 
                    id="INPUT_ID__LOGIN"
                    value={this.state.LOGIN_ID}
                    onChange={this.handleFormInput}  
                    className="Input-Row__Input" 
                    name="INPUT_ID" 
                    type="text" 
                    placeholder="Email"
                  />
                </div>

                <div className="Input-Row">
                  <input 
                    id="INPUT_PW__LOGIN"
                    value={this.state.LOGIN_PW}
                    onChange={this.handleFormInput} 
                    onKeyUp={(event)=>{this.handleLoginSubmit(event)}} 
                    className="Input-Row__Input" 
                    name="INPUT_PW" 
                    type="password" 
                    placeholder="Password"
                  />
                </div>

                <div>
                  <input value={this.state.REMEMBER} onChange={this.handleFormInput} id="REMEMBER" className="Input-Row__Left" type="checkbox" name="REMEMBER" /> <span className="Input-Row__Text">Remember</span> 
                  <span  className="Input-Row__Right Input-Row__Text"><Link to="/home">Find ID/PW</Link></span>
                </div>

              </div>
            </div>
          ) 
          : 
          (
            <div className="Loader-Box--Login">
              <BeatLoader size={30} />
            </div>
          )
          }
        </div>

        <div className="Button-Row">

          <div>
            <button id="LOGIN_BTN" onClick={(event)=>{
              this.handleLoginSubmit(event)
            }} className="Button-Row__Button --Login-Button" type="button">Login</button>
          </div>

          <div>
            <button onClick={()=>{
              loginDispatch.modal()
            }} className="Button-Row__Button --Register-Button" type="button">Register</button>  
          </div>
          
        </div>

    </div>

  </div> 
    )
  }

}

LoginBox = withRouter(LoginBox)

export default LoginBox
