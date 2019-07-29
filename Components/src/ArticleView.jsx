import React from 'react'
import TopBar from './TopBar.jsx'
import { SERVER_URL } from '../redux/GlobalURL.js'
import { HashLoader } from 'react-spinners'

import './ArticleView.scss'
import {withRouter} from 'react-router-dom'

class ArticleView extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            CONTENT : "",
            IS_LOADING_CONTENT : false
        }
        this.renderPostContent = this.renderPostContent.bind(this)
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
                    CONTENT : res.payload[0]["POST_CONTENT"],
                    IS_LOADING_CONTENT : false
                })
            }
        })
    }

    renderPostContent(){
        return (
            <div dangerouslySetInnerHTML={{__html : this.state.CONTENT}}></div>
        )
    }

    render(){
        return(
            <div className="Wrapper --Bg-lightash">

                <TopBar />

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
                    </div>

                </div>
                
            </div>
        )
    }

}

export default withRouter(ArticleView)