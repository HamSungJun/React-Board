import React from 'react'

import { 
  FilePond,
  File,
  registerPlugin
} from 'react-filepond';

import FilePondPluginFileRename from 'filepond-plugin-file-rename'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import './filepond.min.css';
import './filepond-plugin-image-preview.min.css'

import { Redirect } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import { SERVER_URL } from '../redux/GlobalURL';
import AlertBox from './AlertBox.jsx'
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginFileRename
)

export const RegisterBox = (props) => {

    return(

      <div className={"Modal-Wrapper " + (props.loginState.TOGGLE_MODAL?"--Modal-show":"--Modal-hide")}>
        
          <div className="Modal-Content">
          
            <div className="Modal-Header">
              <div onClick={()=>{
                if(props.registerState.IS_VALID_EMAIL && props.registerState.IS_VALID_NAME && props.registerState.IS_VALID_PW && props.registerState.IS_IMG_ASSIGNED && !(props.registerState.IS_SUBMIT_SUCCESS)){
                  props.registerDispatch.registerSubmit()
                }
              }} className={"Modal-Header__Block --Top-Left-Block "+((props.registerState.IS_VALID_EMAIL && props.registerState.IS_VALID_NAME && props.registerState.IS_VALID_PW && props.registerState.IS_IMG_ASSIGNED && !(props.registerState.IS_SUBMIT_SUCCESS))?"--Available":"--Unavailable")}>
                <span className="Modal-Header__Text">
                Submit</span>
              </div>
              <div onClick={()=>{
                props.loginDispatch.modal(props.registerState.IS_SUBMIT_SUCCESS || props.registerState.IS_SUBMIT_ERROR)
              }} className="Modal-Header__Block --Top-Right-Block">
                <span className="Modal-Header__Text">
                Close</span>
              </div>
            </div>
          
          <div>

            {
            props.registerState.IS_SUBMIT_ERROR?
            (
              ErrorDrawer(props)
            )
            :
              props.registerState.IS_SUBMIT_SUCCESS?
              (
                VerifyDrawer(props)
              )
              : 
                props.registerState.IS_SUBMITTING === false?
                  (
                    BodyDrawer(props)
                  )
                  :
                  (
                    LoaderDrawer(props)
                  )
            }
          
          </div>
        
        </div>
        
      </div>
    )
  }




const BodyDrawer = (props) => (
  <div className="Modal-Body">
  {AlertDrawer(props.registerState)}
  <div className="Form-Grid">

    <div className="Form-Grid__Item">

      <div className="Form-Input-Row">
        <label className="Form-Label" htmlFor="">Username</label>
        <input id="INPUT_ID__REGISTER" onChange={props.registerDispatch.registerTyping}  name="USERNAME" className={"Form-Input "+((props.registerState.IS_VALID_NAME?"--Available":"--Input-Unavaliable"))} type="text"/>
      </div>

      <div className="Form-Input-Row">
        <label className="Form-Label" htmlFor="">Email</label>
        <input id="INPUT_EMAIL__REGISTER" onChange={props.registerDispatch.registerTyping} name="EMAIL" className={"Form-Input "+((props.registerState.IS_VALID_EMAIL?"--Available":"--Input-Unavaliable"))} type="text"/>
      </div>

      <div className="Form-Input-Row">
        <label className="Form-Label" htmlFor="">Password</label>
        <input id="INPUT_PW__REGISTER" onChange={props.registerDispatch.registerTyping} name="PASSWORD" className={"Form-Input "+((props.registerState.IS_VALID_PW?"--Available":"--Input-Unavaliable"))} type="password"/>
      </div>

    </div>

    <div className="Form-Grid__Item">
      <label className="Form-Label" htmlFor="">Profile Image</label>
      <FilePond 
        
        maxFiles={1}
        server={`${SERVER_URL}/register/nonformalRegisterFile`}

        allowDrop={(props.registerState.IS_VALID_PW && props.registerState.IS_VALID_EMAIL && props.registerState.IS_VALID_NAME)}
        allowBrowse={(props.registerState.IS_VALID_PW && props.registerState.IS_VALID_EMAIL && props.registerState.IS_VALID_NAME)}
        allowPaste={(props.registerState.IS_VALID_PW && props.registerState.IS_VALID_EMAIL && props.registerState.IS_VALID_NAME)}

        allowMultiple={false}
        allowRevert={true}

        allowFileSizeValidation={true}
        maxFileSize='2MB'

        allowFileTypeValidation={true}
        acceptedFileTypes={['image/*']}

        onremovefile={()=>{
          props.registerDispatch.imageFlush(false,{})
        }}
        onprocessfile={(error,file)=>{

          let FILE_INFO = `${file.serverId}.${file.fileExtension}`

          props.registerDispatch.imageAlloc(true,FILE_INFO)

        }}
        onprocessfilerevert={()=>{
          props.registerDispatch.imageFlush(false,{})
        }}
          
      />
    </div>

  </div>
  
</div>
)

const AlertDrawer = (props) => {

 let AlertBoxes = [];

 let index = 0;
 if(props.IS_VALID_NAME === false){
   AlertBoxes.push(<AlertBox key={index++} alertType='Alert' text="유저네임은 한글 , 영어 대소문자 , 숫자 조합의 2~12자리입니다."/>)
 }
 if(props.IS_VALID_EMAIL === false){
  AlertBoxes.push(<AlertBox key={index++} alertType='Alert' text="이메일 형식에 맞게 작성해야 합니다. ex) abc12345@gmail.com"/>)
 }
 if(props.IS_VALID_PW === false){
  AlertBoxes.push(<AlertBox key={index++} alertType='Alert' text="비밀번호는 영어 대소문자 , 한글 , 특수문자 조합의 8~12자리 입니다."/>)
 }
 if((props.IS_VALID_PW && props.IS_VALID_EMAIL && props.IS_VALID_NAME) === true && props.IS_IMG_ASSIGNED === false){
  AlertBoxes.push(<AlertBox key={index++} alertType='Alert' text="이미지는 image/* , 2MB이하의 파일만 가능합니다." />)
 }
 
 return AlertBoxes

}

const LoaderDrawer = () => (
  <div className="Loader-Box--Register">
    <ScaleLoader height={75} width={15} color='hsl(151, 100%, 45%)' />
  </div>
)


const VerifyDrawer = (props) => (
  <div>
    <div>
      <AlertBox alertType='Success' text={`${props.registerState.EMAIL} 로 인증 메일을 전송하였습니다.`} />
    </div>
  </div> 
)

const ErrorDrawer = (props) => (
  <div>
    <div>
      <AlertBox alertType='Error' text={props.registerState.SUBMIT_ERROR_MESG} />
    </div>
  </div> 
)
