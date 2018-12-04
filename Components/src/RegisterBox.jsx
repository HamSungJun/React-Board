import React from 'react'

import { FilePond, File , registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import './filepond.min.css';
import './filepond-plugin-image-preview.min.css'
import AlertBox from './AlertBox.jsx'

registerPlugin(FilePondPluginImagePreview)

export const RegisterBox = (props) => {

  return(
    <div className={"Modal-Wrapper " + (props.loginState.TOGGLE_MODAL?"--Modal-show":"--Modal-hide")}>

      <div className="Modal-Content">
        <div className="Modal-Header">
          <div onClick={props.registerDispatch.registerSubmit} className={"Modal-Header__Block --Top-Left-Block "+((props.registerState.IS_VALID_EMAIL && props.registerState.IS_VALID_NAME && props.registerState.IS_VALID_PW && props.registerState.IS_IMG_ASSIGNED)?"--Available":"--Unavailable")}>
            <span className="Modal-Header__Text">
            Submit</span>
          </div>
          <div onClick={props.loginDispatch.modal} className="Modal-Header__Block --Top-Right-Block">
            <span className="Modal-Header__Text">
            Close</span>
          </div>
        </div>

        
        <div className="Modal-Body">
          {AlertDrawer(props.registerState)}
          <div className="Form-Grid">

            <div className="Form-Grid__Item">

              <div className="Form-Input-Row">
                <label className="Form-Label" htmlFor="">Username</label>
                <input onChange={props.registerDispatch.registerTyping}  name="USERNAME" className="Form-Input" type="text"/>
              </div>

              <div className="Form-Input-Row">
                <label className="Form-Label" htmlFor="">Email</label>
                <input onChange={props.registerDispatch.registerTyping} name="EMAIL" className="Form-Input" type="text"/>
              </div>

              <div className="Form-Input-Row">
                <label className="Form-Label" htmlFor="">Password</label>
                <input onChange={props.registerDispatch.registerTyping} name="PASSWORD" className="Form-Input" type="password"/>
              </div>

            </div>

            <div className="Form-Grid__Item">
              <label className="Form-Label" htmlFor="">Profile Image</label>
              <FilePond 
                
                onremovefile={()=>{
                  props.registerDispatch.imageFlush()
                }}
                onprocessfile={()=>{
                  props.registerDispatch.imageAlloc()
                }}
                onprocessfilerevert={()=>{
                  props.registerDispatch.imageFlush()
                }}
                
                allowMultiple={false}
                allowRevert={true}
                maxFiles={1}
                server="http://localhost:3000/register/nonformalRegisterFile"
              />
            </div>

          </div>
          
        </div>

        <div className="Modal-Footer">
        </div>

      </div>

    </div>
  )

}

const AlertDrawer = (props) => {

 let AlertBoxes = [];
 let index = 0;
 if(props.IS_VALID_NAME === false){
   AlertBoxes.push(<AlertBox key={index++} text="유저네임은 한글 , 영어 대소문자 , 숫자 조합의 2~12자리입니다."/>)
 }
 if(props.IS_VALID_EMAIL === false){
  AlertBoxes.push(<AlertBox key={index++} text="이메일 형식에 맞게 작성해야 합니다. ex) abc12345@gmail.com"/>)
 }
 if(props.IS_VALID_PW === false){
  AlertBoxes.push(<AlertBox key={index} text="비밀번호는 영어 대소문자 , 한글 , 특수문자 조합의 8~12자리 입니다."/>)
 }


 return AlertBoxes

}

