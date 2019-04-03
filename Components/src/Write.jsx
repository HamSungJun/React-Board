import React from 'react'

import TopBar from '../src/TopBar.jsx'
import Editor from './Editor.jsx'
import '../src/Write.scss'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as WriteActions from '../redux/WriteAction.js'

class Write extends React.Component{

    render(){

        let { writeDispatch } = this.props

        return(

            <div className="Wrapper --Home --Bg-lightash">

                <TopBar />
                
                <div className="Write-Grid-Container">
                    <div className="Write-Grid-Container__Item">
                        <Editor />
                    </div>
                    <div className="Write-Grid-Container__Item">

                    </div>
                </div>
                
            </div>

        )

    }

}

export default Write
