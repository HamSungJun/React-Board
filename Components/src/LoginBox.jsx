import React from 'react'
import { BeatLoader } from 'react-spinners'
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router-dom'


export const LoginBox = (loginState , loginDispatch) => (
  <div className="LoginBox" >

  <div>

      <div className="User">
          <MdAccountCircle id="initialCircle" className="circle" size={120}/>
      </div>

      <div>
        {!loginState.IS_AUTHORIZING?
        (
          <div>
            <div className="Header">
              <span className="Header__Text">Member Login</span>
            </div>
            
            <div>
        
              <div className="Input-Row">
                <input id="INPUT_ID__LOGIN" onChange={loginDispatch.loginTyping} className="Input-Row__Input" name="INPUT_ID" type="text" placeholder="Email"/>
              </div>

              <div className="Input-Row">
                <input onChange={loginDispatch.loginTyping} className="Input-Row__Input" name="INPUT_PW" type="password" placeholder="Password"/>
              </div>

              <div>
                <input checked={loginState.isChecked} onChange={loginDispatch.remember} className="Input-Row__Left" type="checkbox" name="REMEMBER" /> <span className="Input-Row__Text">Remember</span> 
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
          <button onClick={loginDispatch.loginSubmit} className="Button-Row__Button --Login-Button" type="button">Login</button>
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
