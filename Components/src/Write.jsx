import React from 'react'

import TopBar from '../src/TopBar.jsx'
import '../src/Write.scss'

import { MdFormatBold , MdFormatItalic , MdFormatUnderlined } from 'react-icons/md'
import { MdFormatAlignJustify , MdFormatAlignLeft , MdFormatAlignCenter , MdFormatAlignRight } from 'react-icons/md'
import { MdInsertLink , MdInsertPhoto , MdVideoLibrary } from 'react-icons/md'

import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as WriteActions from '../redux/WriteAction.js'
import { throws } from 'assert';

class Write extends React.Component{

    constructor(){
        super()
    }

    componentDidMount(){
        
        document.getElementById('EDITOR').contentEditable = "true"

    }

    handleFormatBold(){

        document.execCommand('bold')

    }


    render(){

        let { writeState , writeDispatch } = this.props

        return(

            <div className="Wrapper --Home --Bg-lightash">

                <TopBar />
                
                <div className="Write-Grid-Container">
                    <div className="Write-Grid-Container__Item">
                        <div className="EditTools-Grid-Container --Bg-lightash">
                            <div className="EditTools-Grid-Container__Item">
                                <MdFormatBold className="EditTools-Item__Icon" onClick={this.handleFormatBold} />
                            </div>
                            <div className="EditTools-Grid-Container__Item">
                                <MdFormatItalic className="EditTools-Item__Icon" />
                            </div>
                            <div className="EditTools-Grid-Container__Item">
                                <MdFormatUnderlined className="EditTools-Item__Icon" />
                            </div>
                            <div className="EditTools-Grid-Container__Item">
                                <MdFormatAlignJustify className="EditTools-Item__Icon" />
                            </div>
                            <div className="EditTools-Grid-Container__Item">
                                <MdFormatAlignLeft className="EditTools-Item__Icon" />
                            </div>
                            <div className="EditTools-Grid-Container__Item">
                                <MdFormatAlignCenter className="EditTools-Item__Icon" />
                            </div>
                            <div className="EditTools-Grid-Container__Item">
                                <MdFormatAlignRight className="EditTools-Item__Icon" />
                            </div>
                            <div className="EditTools-Grid-Container__Item">
                                <MdInsertLink className="EditTools-Item__Icon" />
                            </div>
                            <div className="EditTools-Grid-Container__Item">
                                <MdInsertPhoto className="EditTools-Item__Icon" />
                            </div>
                            <div className="EditTools-Grid-Container__Item">
                                <MdVideoLibrary className="EditTools-Item__Icon" />
                            </div>
                        </div>

                        <div id="EDITOR" >
                            
                        </div>

                        <div id="EDITOR_HTML" >
                        
                        </div>
                        
                    </div>
                    <div className="Write-Grid-Container__Item">

                    </div>
                </div>
                
            </div>

        )

    }

}

// const mapStateToProps = (state) => {
//     return {
//         writeState : state.write
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {

//         writeDispatch : {

//             typing(){
//                 let EDITOR = document.getElementById("EDITOR")
//                 dispatch(WriteActions.AC_USER_TYPING_EDITOR(EDITOR.innerHTML))
//             },
//             FormatBold(){

//                 document.execCommand('bold')
                
//             }
            
//         }

//     }
// }

// Write = withRouter(connect(mapStateToProps, mapDispatchToProps)(Write))

export default Write