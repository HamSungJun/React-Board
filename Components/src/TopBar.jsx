import React from 'react'
import { SERVER_URL } from '../redux/GlobalURL.js'
import Cookies from 'js-cookie'

import * as LoginActions from '../redux/LoginAction.js'
import * as UserActions from '../redux/UserAction.js'

import './TopBar.scss'

import Header_Icon from '../../public/Images/header-icon.svg'
import { MdCreate } from 'react-icons/md'
import { MdAccountCircle } from 'react-icons/md'
import { MdMenu } from 'react-icons/md'
import { IoMdLogOut } from 'react-icons/io'
import { MdPublic } from 'react-icons/md'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

class TopBar extends React.Component{

    componentDidMount(){

        const SID = Cookies.get('SID')
        
        if(SID !== undefined && this.props.userState.USERNAME === "Unknown"){
            this.props.TopBarDispatch.getSessionData(SID)
        }

    }

    render(){

        let { userState, loginState, TopBarDispatch } = this.props

        return (

            <div className="TopBar --Fixed">

                <div className="TopBar__Grid-Container">

                    <div className="TopBar__Grid-Container__Item">
                    <div className="TopBar__Grid-Container__Item__Item">
                        <img className="TopBar__Grid-Container__Item__Item__Img" src={Header_Icon} alt="Header_Icon"/>
                    </div>
                    <div className="TopBar__Grid-Container__Item__Item">
                        <span className="TopBar__Grid-Container__Item__Item__Text">React-Board</span>
                    </div>
                    </div>

                    <div className="TopBar__Grid-Container__Item"></div>

                    <div className="TopBar__Grid-Container__Item">
              
                        <div className="TopBar__Grid-Container__Item__Profile">
                            <div className="TopBar__Grid-Container__Item__Profile__Item">
                            {
                                loginState.IS_AUTH_SUCCESS || userState.IS_SESSION_SUCCESS?
                                (
                                <img className="Profile-Image-Size" src={`${SERVER_URL}${PARSE_U_IMG_PATH(userState.U_IMG_PATH)}`} alt=""/>
                                )
                                :
                                (
                                <MdAccountCircle className="Profile-Icon-Size" id="MdAccountCircle"/>
                                )

                            }
                            </div>
                            <div className="TopBar__Grid-Container__Item__Profile__Item">
                            <span className="TopBar__Grid-Container__Item__Profile__Item-Text">{`${userState.USERNAME}님`}</span>
                            </div>
                        </div>

                        <div className="TopBar__Grid-Container__Item__Item">
                            <MdPublic className="Icon-Size" id="MdPublic" />
                        </div>
                        <div className="TopBar__Grid-Container__Item__Item">
                            <MdCreate onClick={TopBarDispatch.write} className="Icon-Size" id="MdCreate" />
                        </div>
                        <div className="TopBar__Grid-Container__Item__Item">
                            <IoMdLogOut onClick={TopBarDispatch.logout} className="Icon-Size" id="IoMdLogOut"/>
                        </div>

                    </div>

                </div>
          
            </div>

        )

    }

}

const mapStateToProps = (state) => {

    return {
  
      loginState : state.login,
      userState : state.user
  
    }
  
  }
  
const mapDispatchToProps = (dispatch) => {

    return {

        TopBarDispatch : {

            getSessionData(sid){
                dispatch(UserActions.AC_GET_SESSION_DATA(sid))
            },
            logout(){
                dispatch(LoginActions.AC_USER_LOGOUT())
            },
            write(){
                dispatch(UserActions.AC_USER_CLICK_WRITE())
            }
                
        }

    }
}

const PARSE_U_IMG_PATH = (path) => {

    let U_IMG_PATH = new String(path)
    U_IMG_PATH = U_IMG_PATH.substring(1)
    return U_IMG_PATH

}

TopBar = withRouter(connect(mapStateToProps,mapDispatchToProps)(TopBar))

export default TopBar