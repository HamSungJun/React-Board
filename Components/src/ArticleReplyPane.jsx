import React from 'react'
import './ArticleReplyPane.scss'
import { FaAngleDoubleRight, FaThumbsUp, FaThumbsDown } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import {SERVER_URL} from '../redux/GlobalURL.js'
import {withRouter} from 'react-router-dom'

class ArticleReplyPane extends React.Component{

    constructor(props){
        super(props)
    }

    stampToDate(stamp){
        if(stamp){
            return new Date(stamp).toJSON().substr(0,10);
        }
    }

    setImage(imgPath){
        if(!imgPath){
            return SERVER_URL.concat("/UserImages/no-user-img.svg")
        }
        else{
            return SERVER_URL.concat(`/UserImages/${imgPath}`)
        }
    }

    renderPostReply(){

        if(!!this.props.post.POST_REPLY && this.props.post.POST_REPLY.length > 0){
            return this.props.post.POST_REPLY.map((el,index) => {
                return (
                    <div key={index} className="Reply-Row">
                        <div className="Reply-Row__Item">
                            <img src={`${SERVER_URL}/UserImages/${el.REPLY_AUTHOR_IMAGE}`} alt=""/> 
                        </div>
                        <div className="Reply-Row__Item">
                            <span>{el.REPLY_AUTHOR}</span>
                        </div>
                        <div className="Reply-Row__Item">
                            <span className="Font-Bold">{el.REPLY_CONTENT}</span>
                        </div>
                        <div className="Reply-Row__Item">
                            <span>{this.stampToDate(el.REPLY_DATE)}</span>
                        </div>
                        {
                            window.sessionStorage.getItem('EMAIL') === el.REPLY_AUTHOR_EMAIL ? 
                            (<div className="Reply-Row__Item">
                                <MdDelete onClick={()=>{
                                    console.log(el)
                                    if(!!this.props.location.state.postId){
                                        this.props.replyDeleteHandler(this.props.location.state.postId,el._id)
                                    }
                                }} className="Delete-Icon" />
                            </div>) 
                            : 
                            (<div></div>)
                        }
                        
                    </div>
                )
            })
        }

    }

    render(){
        return(
            <div className="ArticleReplyPane-Container --ArticleReplyPane-Hide">
                
                <div className="ArticleReplyPane-Inner">
                    
                    <div className="ArticleReplyPane-Inner__Header">
                        <div className="ArticleReplyPane-Inner__Header__Item">
                            <FaAngleDoubleRight onClick={this.props.hideHandler} id="Fold" />
                        </div>
                        <div className="ArticleReplyPane-Inner__Header__Item">
                            <h3 className="ArticleReplyPane-Inner__Header__Item__Title">{this.props.post.POST_TITLE}</h3>
                        </div>
                        <div className="ArticleReplyPane-Inner__Header__Item">
                            <img className="ArticleReplyPane-Inner__Header__Item__User-Image" src={this.setImage(this.props.post.U_IMG_PATH)} alt=""/>
                        </div>
                    </div>
                    <div className="ArticleReplyPane-Inner__Sub-Info">
                        <div className="ArticleReplyPane-Inner__Sub-Info__Item">
                            <span>{this.props.post.EMAIL}</span>
                        </div>
                        <div className="ArticleReplyPane-Inner__Sub-Info__Item">
                            <span>{this.props.post.AUTHOR}</span>
                        </div>
                        <div className="ArticleReplyPane-Inner__Sub-Info__Item">
                            <span>{this.stampToDate(this.props.post.POST_DATE)}</span>
                        </div>
                        <div className="ArticleReplyPane-Inner__Sub-Info__Item">
                            <FaThumbsUp onClick={() => {
                                if(this.props.location.state.postId && window.sessionStorage.getItem('EMAIL')){
                                    this.props.thumbUpHandler(this.props.location.state.postId,window.sessionStorage.getItem('EMAIL'))
                                }
                            }} id="THUMB_UP" />
                            <span className="ArticleReplyPane-Inner__Sub-Info__Item__Thumb-Number">{this.props.post.RECOMMEND}</span>
                        </div>
                    </div>
                    <div className="ArticleReplyPane-Inner__List">
                        {this.renderPostReply()}
                    </div>
                    <div className="ArticleReplyPane-Inner__Interface">
                        <div className="ArticleReplyPane-Inner__Interface__Item">
                            <input value={this.props.replyContent} onChange={this.props.replyContentChangeHandler}     onKeyDown={(event)=>{
                                if(event.keyCode === 13){
                                    this.props.replyPostHandler()
                                }
                            }} placeholder="type reply here." className="ArticleReplyPane-Inner__Interface__Item__Input" type="text"/>
                        </div>
                        <div className="ArticleReplyPane-Inner__Interface__Item">
                            <button onClick={this.props.replyPostHandler} id="SEND_REPLY">reply</button>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}



export default withRouter(ArticleReplyPane)