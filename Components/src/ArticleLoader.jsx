import React from 'react'
import { SERVER_URL } from '../redux/GlobalURL.js'
import './ArticleLoader.scss'
import { MdSearch } from 'react-icons/md'
import { FaThumbsUp, FaEye, FaReplyd } from 'react-icons/fa'
import { connect } from 'react-redux'
import { AC_LOAD_POSTINGS, AC_POST_EYE_UP, AC_REFRESH_ARTICLE_LOAD_STATE } from '../redux/ArticleLoaderAction.js'
import { HashLoader } from 'react-spinners'
import { withRouter } from 'react-router-dom' 

class ArticleLoader extends React.Component{

    constructor(props){
        super(props)
        this.handleScrollBottom = this.handleScrollBottom.bind(this)
    }

    componentDidMount(){

        let { articleLoaderState , articleLoaderDispatch } = this.props

        if(articleLoaderState.SKIP === 0){
            articleLoaderDispatch.loadPostings()
        }

        let articleWrapper = document.querySelector(".ArticleLoader-Wrapper");
        articleWrapper.addEventListener('scroll',this.handleScrollBottom);

    }

    renderReadableDocs(){
        let { articleLoaderState, articleLoaderDispatch } = this.props
        const makeDocTemplate = (el,index) => {
            return (
                <div onClick={()=>{
                    this.props.articleLoaderDispatch.postEyeUp(el._id)
                    this.handleRouteToPostContent(el._id)
                }}  className="ArticleLoader-Wrapper__Item" key={index}>
                    <div className="ArticleLoader-Wrapper__Item__Thumbnail">
                        <img src={el.POST_THUMBNAIL === 'none' ? `${SERVER_URL}/Images/no-img.jpg` : el.POST_THUMBNAIL } alt=""/>
                    </div>
                    <div>
                        <div className="ArticleLoader-Wrapper__Item__Sub-Row">
                        
                            <div className="ArticleLoader-Wrapper__Item__Title__Item">
                                <span>{el.POST_TITLE}</span>
                            </div>
                            <div className="ArticleLoader-Wrapper__Item__Title__Item">
                                <span>{new Date(el.POST_DATE).toLocaleDateString('kr')}</span>
                            </div>
                            
                        </div>
                        <div className="ArticleLoader-Wrapper__Item__Sub-Row">
                            <div className="ArticleLoader-Wrapper__Item__Author">
                                <img src={`${SERVER_URL}/UserImages/${el.U_IMG_PATH}`} alt=""/>
                                <span>{el.AUTHOR}</span>
                            </div>
                            <div className="ArticleLoader-Wrapper__Item__Recommend">
                                <FaThumbsUp className="ThumbUp-Icon" />
                                <span className="ThumbUp-Number">{(el.RECOMMEND || []).length}</span>
                            </div>
                            <div className="ArticleLoader-Wrapper__Item__Eye">
                                <FaEye className="Eye-Icon" />
                                <span className="Eye-Number">{(el.EYE || 0)}</span>
                            </div>
                            <div className="ArticleLoader-Wrapper__Item__Recommend">
                                <FaReplyd className="Reply-Icon" />
                                <span className="Reply-Number">{(el.POST_REPLY || []).length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return articleLoaderState.READABLE_DOCS.map((el,index) => {
            if(articleLoaderState.IS_SEARCHING && !!el.SEARCH_TOUCHED){
                return makeDocTemplate(el,index)
            }
            else if(!articleLoaderState.IS_SEARCHING){
                return makeDocTemplate(el,index)
            }
        })

    }

    handleRouteToPostContent(postId){
        return this.props.history.push(`/view?user=${window.sessionStorage.getItem('EMAIL').split("@")[0]}&postId=${postId}`,{
            postId : postId
        })
    }

    handleScrollBottom(event){
        if(event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight){
            this.props.articleLoaderDispatch.loadPostings()
        }
    }

    render(){
        let {articleLoaderState} = this.props
        return (
            <div className={`ArticleLoader-Wrapper ${articleLoaderState.SKIP === 0?('--Element-Centered'):("")}`}>
                {
                    articleLoaderState.SKIP === 0 ?
                        (<HashLoader size={150} />)
                        :
                        (this.renderReadableDocs())
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        articleLoaderDispatch : {
            loadPostings(explicitSkip){
                return dispatch(AC_LOAD_POSTINGS(explicitSkip))
            },
            postEyeUp(postId){
                return dispatch(AC_POST_EYE_UP(postId))
            }
        }
    }

}

const mapStateToProps = (state) => {
    return {
        articleLoaderState : state.articleLoader
    }
}

ArticleLoader = withRouter(connect(mapStateToProps,mapDispatchToProps)(ArticleLoader)) 

export default ArticleLoader