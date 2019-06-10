import React from 'react'

import { MdFormatBold , MdFormatItalic , MdFormatUnderlined } from 'react-icons/md'
import { MdFormatAlignJustify , MdFormatAlignLeft , MdFormatAlignCenter , MdFormatAlignRight } from 'react-icons/md'
import { MdInsertLink , MdInsertPhoto , MdVideoLibrary } from 'react-icons/md'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { AC_USER_TOGGLE_VIEW , AC_USER_TYPING_EDITOR , AC_USER_SELECTION } from '../redux/WriteAction.js'

import _store from '../redux/_store'

import './Editor.scss'

let target;

class Editor extends React.Component{

    constructor(props){

        super(props)
        this.handleFormatBold = this.handleFormatBold.bind(this)
        
    }

    componentDidMount(){

        const { writeDispatch } = this.props

        let EDITOR = document.querySelector('#EDITOR')
        
        EDITOR.addEventListener('selectstart',() => {
            
            target = saveSelection()
            
            console.log(target)

        })

    }

    handleFormatBold(event){
        event.stopPropagation()
        console.log(`Hey! ${target.endContainer.text}`)

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

                <div

                    id="EDITOR"
                    suppressContentEditableWarning={true}
                    className={`${writeState.isEditing?('--Show'):('--Hide')}`}
                    // onInput={writeDispatch.syncToHtml}
                    onKeyUp={(event)=>{
                        writeDispatch.typeKeyUp(event)
                    }}
                    contentEditable={true}>

                </div>

                <div

                    id="EDITOR_HTML"
                    suppressContentEditableWarning={true}
                    className={`${!writeState.isEditing?('--Show'):('--Hide')}`}
                    contentEditable={true}>
                    {writeState.HTML}

                </div>

            </div>

        </div>

        )
    }


}

function saveSelection() {
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            return sel.getRangeAt(0);
        }
    } else if (document.selection && document.selection.createRange) {
        return document.selection.createRange();
    }
    return null;
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

            typeKeyUp(event){
              
              let pressedKey = event.keyCode || event.which()

              if(pressedKey !== 13){
                  dispatch(AC_USER_TYPING_EDITOR(document.getElementById('EDITOR').innerHTML))
              }

            },

        }

    }

}

Editor = connect(mapStateToProps,mapDispatchToProps)(Editor)

export default Editor
