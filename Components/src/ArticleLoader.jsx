import React from 'react'
import { SERVER_URL } from '../redux/GlobalURL.js'
import './ArticleLoader.scss'
import { MdSearch } from 'react-icons/md'
import { connect } from 'react-redux'
import { AC_LOAD_INITIAL_POSTINGS } from '../redux/ArticleLoaderAction.js'
import { HashLoader } from 'react-spinners'
import { withRouter } from 'react-router-dom' 

class ArticleLoader extends React.Component{

    componentDidMount(){
        let { articleLoaderState , articleLoaderDispatch } = this.props
        if(articleLoaderState.READABLE_DOCS.length === 0){
            articleLoaderDispatch.loadInitialPostings()
        }
    }

    renderReadableDocs(){
        let { articleLoaderState } = this.props
        return articleLoaderState.READABLE_DOCS.map((el,index) => {
            return (
                <div onClick={()=>{
                    this.handleRouteToPostContent(el._id)
                }}  className="ArticleLoader-Wrapper__Item" key={index}>
                    <div className="ArticleLoader-Wrapper__Item__Thumbnail">
                        <img src={el.POST_THUMBNAIL === 'none' ? `${SERVER_URL}/Images/no-img.jpg` : el.POST_THUMBNAIL } alt=""/>
                    </div>
                    <div>
                        <div className="ArticleLoader-Wrapper__Item__Title">
                        
                            <div className="ArticleLoader-Wrapper__Item__Title__Item">
                                <span>{el.POST_TITLE}</span>
                            </div>
                            <div className="ArticleLoader-Wrapper__Item__Title__Item">
                                <span>{new Date(el.POST_DATE).toLocaleDateString('kr')}</span>
                            </div>
                            
                        </div>
                        <div>
                            <div className="ArticleLoader-Wrapper__Item__Author">
                                <img src={`${SERVER_URL}/UserImages/${el.U_IMG_PATH}`} alt=""/>
                                <span>{el.AUTHOR}</span>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            )
        })

    }

    handleRouteToPostContent(postId){
        return this.props.history.push(`/view?user=${window.sessionStorage.getItem('EMAIL').split("@")[0]}&postId=${postId}`,{
            postId : postId
        })
    }

    render(){
        let {articleLoaderState} = this.props
        return (
            <div className={`ArticleLoader-Wrapper ${articleLoaderState.IS_INITIAL_LOADING?('--Element-Centered'):("")}`}>
                {
                    articleLoaderState.IS_INITIAL_LOADING ?
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
            loadInitialPostings(){
                return dispatch(AC_LOAD_INITIAL_POSTINGS())
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