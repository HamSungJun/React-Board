import React from 'react'
import TopBar from './TopBar.jsx'
import { SERVER_URL } from '../redux/GlobalURL.js'
import { HashLoader } from 'react-spinners'
import ArticleReplyPane from './ArticleReplyPane.jsx'
import { FaReplyd } from 'react-icons/fa'
import { MdViewList } from 'react-icons/md'

import './ArticleView.scss'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class ArticleView extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            POST : {},
            REPLY_CONTENT : "",
            IS_LOADING_CONTENT : false,
        }
        this.renderPostContent = this.renderPostContent.bind(this)
        this.handleRouteToHome = this.handleRouteToHome.bind(this)
        this.handleReplyContentChange = this.handleReplyContentChange.bind(this)
        this.handleReplyPostClick = this.handleReplyPostClick.bind(this)
        this.handleReplyDeleteClick = this.handleReplyDeleteClick.bind(this)
        this.handleThumbUpClick = this.handleThumbUpClick.bind(this)
    }

    componentDidMount(){
       
        this.setState({
            IS_LOADING_CONTENT : true
        })
        fetch(`${SERVER_URL}/read/getContentById?_id=${this.props.location.state.postId}`,{
            method : 'GET'
        })
        .then(res=>res.json())
        .then((res) => {
            if(res.status === 1){
                
                this.setState({
                    POST : res.payload[0],
                    IS_LOADING_CONTENT : false
                })
                
            }
        })

    }

    renderPostContent(){
        return (
            <div dangerouslySetInnerHTML={{__html : this.state.POST.POST_CONTENT}}></div>
        )
    }

    handleShowReplyPane(){
        let ReplyPane = document.querySelector('.ArticleReplyPane-Container');
        ReplyPane.classList.remove('--ArticleReplyPane-Hide');
    }
    handleReplyPaneHide(){
        let ReplyPane = document.querySelector('.ArticleReplyPane-Container');
        ReplyPane.classList.add('--ArticleReplyPane-Hide');
    }

    handleRouteToHome(){
        let { history } = this.props;
        return history.push(`/home?user=${window.sessionStorage.getItem('EMAIL').split("@")[0]}`,null);
    }

    handleReplyPostClick(event){

        let inputs = document.querySelectorAll(['.ArticleReplyPane-Inner__Interface__Item__Input','#SEND_REPLY'])
        inputs.forEach(el=>el.disabled=true)
        inputs[1].textContent = "sending..."
        fetch(`${SERVER_URL}/read/postReply`,{
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                _id : this.props.location.state.postId,
                REPLY_AUTHOR : window.sessionStorage.getItem('USERNAME'),
                REPLY_AUTHOR_IMAGE : window.sessionStorage.getItem('U_IMG_PATH').split("/").reverse()[0],
                REPLY_AUTHOR_EMAIL : window.sessionStorage.getItem('EMAIL'),
                REPLY_CONTENT : this.state.REPLY_CONTENT,
                REPLY_DATE : new Date().getTime().toString()
            })
        }).then(res => res.json())
        .then(res => {
            if(res.status === 1){
                inputs.forEach(el=>el.disabled=false)
                inputs[1].textContent = "reply"
                if(inputs[1].classList.contains('OK')){
                    inputs[1].classList.remove('OK');
                }
                this.setState({
                    POST : res.payload,
                    REPLY_CONTENT : ""
                })
                let list = document.querySelector('.ArticleReplyPane-Inner__List');
                list.scrollTop = list.scrollHeight
            }
        })

    }

    handleReplyDeleteClick(articleId,replyId){
        fetch(`${SERVER_URL}/read/deleteReply`,{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                targetArticleId : articleId,
                targetReplyId : replyId
            })
        }).then(res => res.json())
        .then(res => {
            if(res.status === 1){
                this.setState({
                    POST : res.payload
                })
            }
        })
    }

    handleThumbUpClick(targetArticleId,EMAIL){
        
        fetch(`${SERVER_URL}/read/recommendUp`,{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                targetArticleId : targetArticleId,
                EMAIL : EMAIL
            })
        }).then(res => res.json())
        .then(res => {
            if(res.status === 1){
                this.setState({
                    POST : res.payload
                })
            }
        })

    }
    
    handleReplyContentChange(event){
        let send_btn = document.getElementById("SEND_REPLY")
        if(event.target.value.length > 0){
            if(!send_btn.classList.contains('OK')){
                send_btn.classList.add('OK')
            }
        }
        else{
            if(send_btn.classList.contains('OK')){
                send_btn.classList.remove('OK')
            }
        }
        return this.setState({
            REPLY_CONTENT : event.target.value
        })
    }

    render(){
        return(
            <div className="Wrapper --Bg-lightash">

                <TopBar />
                <ArticleReplyPane 
                    post={this.state.POST}
                    replyContent={this.state.REPLY_CONTENT} 
                    hideHandler={this.handleReplyPaneHide} 
                    replyPostHandler={this.handleReplyPostClick}
                    replyDeleteHandler={this.handleReplyDeleteClick} 
                    replyContentChangeHandler={this.handleReplyContentChange}
                    thumbUpHandler={this.handleThumbUpClick}
                />
                <div className="View-Grid-Container">
                    
                    <div id="VIEW_AREA" className={`View-Grid-Container__Item ${this.state.IS_LOADING_CONTENT?('--Element-Centered'):("")}`}>
                        {
                            this.state.IS_LOADING_CONTENT ?
                            (<HashLoader size={150} />)
                            :
                            (this.renderPostContent())
                        }
                    </div>

                    <div className="View-Grid-Container__Item">
                        <div className="View-Grid-Container__Item__Item">
                            <button className="View-Btn" onClick={this.handleShowReplyPane}>
                                <FaReplyd className="Interface-Icon" />
                                Reply
                            </button>
                            <button className="View-Btn" onClick={this.handleRouteToHome}>
                                <MdViewList className="Interface-Icon" />
                                To List
                            </button>
                        </div>
                    </div>

                </div>
                
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        articleLoaderState : state.articleLoader
    }
}

export default withRouter(connect(mapStateToProps,null)(ArticleView))