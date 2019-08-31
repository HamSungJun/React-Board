import React from 'react'
import { SERVER_URL } from '../redux/GlobalURL.js'
import Cookies from 'js-cookie'

import * as LoginActions from '../redux/LoginAction.js'
import * as UserActions from '../redux/UserAction.js'

import './TopBar.scss'

import Header_Icon from '../../public/Images/post-it.svg'
import { MdCreate, MdSearch } from 'react-icons/md'
import { MdAccountCircle } from 'react-icons/md'
import { MdMenu } from 'react-icons/md'
import { IoMdLogOut } from 'react-icons/io'
import { MdPublic } from 'react-icons/md'
import { connect } from 'react-redux';
import { withRouter , Redirect } from 'react-router-dom'
import { sha3_256 } from 'js-sha3'
import {AC_TITLE_SEARCH} from '../redux/ArticleLoaderAction.js'

class TopBar extends React.Component{

    constructor(props){
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleRouteToWrite = this.handleRouteToWrite.bind(this)
        this.handleRouteToHome = this.handleRouteToHome.bind(this)
        this.handleTitleSearch = this.handleTitleSearch.bind(this)
    }

    handleLogout(){
        window.sessionStorage.clear()
        let { history } = this.props
        history.go(-(history.length - 2))
        // history.push('/',null)
    }

    handleRouteToWrite(){
        let { history } = this.props
        history.push(`/write?user=${window.sessionStorage.getItem('EMAIL').split("@")[0]}`,null)
    }
    handleRouteToHome(){
        let { history } = this.props
        history.push(`/home?user=${window.sessionStorage.getItem('EMAIL').split("@")[0]}`,null)
    }

    handleTitleSearch(event){
        return this.props.articleLoaderDispatch.titleSearch(event.target.value)
    }

    render(){

        let { loginState } = this.props

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

                    <div className="TopBar__Grid-Container__Item">
                        <div className="TopBar__Grid-Container__Item__Search">
                            <MdSearch id="SEARCH" size={22} />
                            <input onChange={this.handleTitleSearch} type="text" placeholder="검색"/>
                        </div>
                    </div>

                    <div className="TopBar__Grid-Container__Item">
              
                        <div className="TopBar__Grid-Container__Item__Profile">
                            <div className="TopBar__Grid-Container__Item__Profile__Item">
                            {
                                loginState.IS_AUTH_SUCCESS || window.sessionStorage.USERNAME?
                                (
                                <img className="Profile-Image-Size" src={`${SERVER_URL}${PARSE_U_IMG_PATH(window.sessionStorage.U_IMG_PATH)}`} alt=""/>
                                
                                )
                                :
                                (
                                <MdAccountCircle className="Profile-Icon-Size" id="MdAccountCircle"/>
                                )

                            }
                            </div>
                            <div className="TopBar__Grid-Container__Item__Profile__Item">
                            <span className="TopBar__Grid-Container__Item__Profile__Item-Text">{`${window.sessionStorage.USERNAME}님`}</span>
                            </div>
                        </div>

                        <div className="TopBar__Grid-Container__Item__Item">
                            <MdPublic onClick={this.handleRouteToHome} className="Icon-Size" id="MdPublic" />
                        </div>
                        <div className="TopBar__Grid-Container__Item__Item">
                            <MdCreate onClick={this.handleRouteToWrite} className="Icon-Size" id="MdCreate" />
                        </div>
                        <div className="TopBar__Grid-Container__Item__Item">
                            <IoMdLogOut onClick={this.handleLogout} className="Icon-Size" id="IoMdLogOut"/>
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
        articleLoaderDispatch : {
            titleSearch(searchText){
                dispatch(AC_TITLE_SEARCH(searchText))
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
