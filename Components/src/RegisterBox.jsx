import React from 'react'

import { FilePond, File , registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import './filepond.min.css';
import './filepond-plugin-image-preview.min.css'

registerPlugin(FilePondPluginImagePreview)

export const RegisterBox = (props) => {

  return(
    <div className={"Modal-Wrapper " + (props.loginState.TOGGLE_MODAL?"--Modal-show":"--Modal-hide")}>

      <div className="Modal-Content">

        <div className="Modal-Header">
          <div className="Modal-Header__Block --Top-Left-Block">
            <span className="Modal-Header__Text">
            Submit</span>
          </div>
          <div onClick={props.loginDispatch.modal} className="Modal-Header__Block --Top-Right-Block">
            <span className="Modal-Header__Text">
            Close</span>
          </div>
        </div>

        
        <div className="Modal-Body">

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
                // ref={ref => this.pond = ref}
                allowMultiple={false} 
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


