import React from 'react'

import { MdFormatBold , MdFormatItalic , MdFormatUnderlined } from 'react-icons/md'
import { MdFormatAlignJustify , MdFormatAlignLeft , MdFormatAlignCenter , MdFormatAlignRight } from 'react-icons/md'
import { MdInsertLink , MdInsertPhoto , MdVideoLibrary } from 'react-icons/md'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { AC_USER_TOGGLE_VIEW , AC_USER_TYPING_EDITOR } from '../redux/WriteAction.js'

import _store from '../redux/_store'

import './Editor.scss'

class Editor extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            selection : {}
        }
        this.handleFormatBold = this.handleFormatBold.bind(this)
    }
    componentDidMount(){
        let EDITOR = document.getElementById('EDITOR')
    
        EDITOR.addEventListener('mouseup',()=>{

            this.setState({
                selection : window.getSelection().getRangeAt(0)
            })
            
        })
    }

    handleFormatBold(){
        console.log(this.state.selection)
        let EDITOR = document.getElementById('EDITOR')
        
        _store.dispatch(AC_USER_TYPING_EDITOR(EDITOR.innerHTML))
    }

    render(){

        let { writeState , writeDispatch } = this.props

        return(

            <div className="Editor-Box">

            <div className="EditTools-Grid-Container --Bg-lightash">

                <div className="Nested-Grid">

                    <div className="EditTools-Grid-Container__Item">
                        <MdFormatBold id="MdFormatBold" className="EditTools-Item__Icon"
                        onClick={this.handleFormatBold} />
                    </div>
                    <div className="EditTools-Grid-Container__Item">
                        <MdFormatItalic id="MdFormatItalic" className="EditTools-Item__Icon" />
                    </div>
                    <div className="EditTools-Grid-Container__Item">
                        <MdFormatUnderlined id="MdFormatUnderlined" className="EditTools-Item__Icon" />
                    </div>
                    <div className="EditTools-Grid-Container__Item">
                        <MdFormatAlignJustify id="MdFormatAlignJustify" className="EditTools-Item__Icon" />
                    </div>
                    <div className="EditTools-Grid-Container__Item">
                        <MdFormatAlignLeft id="MdFormatAlignLeft" className="EditTools-Item__Icon" />
                    </div>

                </div>

                <div className="Nested-Grid">
                    <div className="EditTools-Grid-Container__Item">
                        <MdFormatAlignCenter id="MdFormatAlignCenter" className="EditTools-Item__Icon" />
                    </div>
                    <div className="EditTools-Grid-Container__Item">
                        <MdFormatAlignRight id="MdFormatAlignRight" className="EditTools-Item__Icon" />
                    </div>
                    <div className="EditTools-Grid-Container__Item">
                        <MdInsertLink id="MdInsertLink" className="EditTools-Item__Icon" />
                    </div>
                    <div className="EditTools-Grid-Container__Item">
                        <MdInsertPhoto id="MdInsertPhoto" className="EditTools-Item__Icon" />
                    </div>
                    <div className="EditTools-Grid-Container__Item">
                        <MdVideoLibrary id="MdVideoLibrary" className="EditTools-Item__Icon" />
                    </div>
                </div>

                <div className="Nested-Flex-View">
                
                    <div onClick={()=>{
                        writeDispatch.toggleView('Editor')
                    }} className={`View-Item ${writeState.isEditing?('--View-Clicked'):('')}`}>
                        <span className="View-Item-Text">Editor</span>
                    </div>
                    <div onClick={()=>{
                        writeDispatch.toggleView('Html')
                    }} className={`View-Item ${!writeState.isEditing?('--View-Clicked'):('')}`}>
                        <span className="View-Item-Text">HTML</span>
                    </div>
                    
                </div>
            </div>

            <div>

                {writeState.isEditing?
                (
                    <div id="EDITOR" contentEditable={true}>
                        {writeState.HTML}
                    </div>
                )
                :
                (
                    <div id="EDITOR_HTML" >
                        {writeState.HTML}
                    </div>
                )
                }
            
            </div>

        </div>

        )
    }


}

const mapStateToProps = (state) => {

    return {
        writeState : state.write
    }

}

const mapDispatchToProps = (dispatch) => {

    return {

        writeDispatch : {

            toggleView(view){

                dispatch(AC_USER_TOGGLE_VIEW(view))

            },

            syncDoc(){

                let EDITOR = document.getElementById('EDITOR')
                let Doc = EDITOR.innerHTML
                dispatch(AC_USER_TYPING_EDITOR(Doc))

            }

        }

    }

}

Editor = connect(mapStateToProps,mapDispatchToProps)(Editor)

export default Editor