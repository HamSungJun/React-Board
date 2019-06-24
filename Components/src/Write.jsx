import React from 'react'

import TopBar from '../src/TopBar.jsx'
import Editor from './Editor.jsx'
import ImageLoader from './ImageLoader.jsx'
import VideoLoader from './VideoLoader.jsx'
import '../src/Write.scss'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as WriteActions from '../redux/WriteAction.js'

class Write extends React.Component{

    render(){

        let { writeState } = this.props

        return(

            <div className="Wrapper --Home --Bg-lightash">

                <TopBar />
                
                <div className="Write-Grid-Container">
                    <div className="Write-Grid-Container__Item">
                        <Editor />
                    </div>
                    <div className="Write-Grid-Container__Item">
                        {
                            writeState.MediaState?
                                (<ImageLoader />)
                                :
                                (<VideoLoader />)
                        }
                    </div>
                </div>
                
            </div>

        )

    }

}

const mapStateToProps = (state) => {

    return{
        writeState : state.write
    }

}

Write = withRouter(connect(mapStateToProps,null)(Write))

export default Write
