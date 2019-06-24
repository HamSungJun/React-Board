import React from 'react'

import { MdFormatBold , MdFormatItalic , MdFormatUnderlined } from 'react-icons/md'
import { MdFormatAlignJustify , MdFormatAlignLeft , MdFormatAlignCenter , MdFormatAlignRight } from 'react-icons/md'
import { MdInsertLink , MdInsertPhoto , MdVideoLibrary , MdTextFormat , MdFormatColorText , MdFormatSize } from 'react-icons/md'
import { FaUnlink } from 'react-icons/fa'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { AC_USER_TOGGLE_VIEW , AC_USER_TYPING_EDITOR , AC_USER_SELECTION } from '../redux/WriteAction.js'
import { TwitterPicker } from 'react-color'


import _store from '../redux/_store'

import './Editor.scss'

class Editor extends React.Component{

    constructor(props){

        super(props)
           
    }

    componentDidMount(){

        let InnerEditor = RICH_TEXT_AREA.document
        InnerEditor.designMode = "on"

        INITIALIZE_EDIT_BUTTONS(InnerEditor)
        INITIALIZE_SIZE_LISTS(InnerEditor)

        let OuterEditor = document.querySelector("#EDITOR")

        OuterEditor.addEventListener('click',(event) => {
            event.stopPropagation()
        })

        let EditTools = document.querySelectorAll(".EditTools-Grid-Container__Item")
        EditTools.forEach((el)=>{
            el.addEventListener('click',(event)=>{
                event.stopPropagation()
            })
        })

    }

    render(){

        let { writeState , writeDispatch } = this.props

        return(

            <div className="Editor-Box">

            <div className="EditTools-Grid-Container --Bg-lightash">

                <div className="Nested-Grid">

                    <div className="EditTools-Grid-Container__Item">
                        <MdFormatBold id="MdFormatBold" className="EditTools-Item__Icon" />
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
                        <FaUnlink id="FaUnlink" className="EditTools-Item__Icon" />
                    </div>
                    <div className="EditTools-Grid-Container__Item">
                        <button id="supButton" title="Superscript">X<sup>2</sup></button>
                    </div>

                  
                </div>

                <div className="Nested-Grid">
                    <div className="EditTools-Grid-Container__Item">
                        <MdFormatColorText id="MdFormatColorText" className="EditTools-Item__Icon" />
                        {/* <TwitterPicker class /> */}
                    </div>
                    <div className="EditTools-Grid-Container__Item Format-Size">
                        <MdFormatSize id="MdFormatSize" className="EditTools-Item__Icon" />
                        <div id="FormatSizeListPointer" className="top-pointing-triangle --Hide"></div>
                        <div id="FormatSizeList" className="--Hide"> 
                            
                        </div>
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

                <div id="EDITOR">

                    <iframe id="RICH_TEXT_AREA"  name="RICH_TEXT_AREA" frameborder="0"></iframe>                    

                </div>

                <div>

                </div>

            </div>

        </div>

        )
    }


}

const INITIALIZE_SIZE_LISTS = (editor) => {
    
    let $sizeList = document.querySelector('#FormatSizeList')
    for (let index = 1; index <= 8; index++) {
        
        let $li = document.createElement('div')
        $li.setAttribute('class','Format-Size-li')
        $li.textContent = index
        
        $li.addEventListener('click',(event)=>{
            editor.execCommand('FontSize',false,parseInt(event.target.textContent))
            FORMAT_SIZE_LIST_HIDE()
        })

        $sizeList.append($li)

    }

}

const INITIALIZE_EDIT_BUTTONS = (editor) => {

    let boldButton = document.querySelector("#MdFormatBold")
    boldButton.addEventListener('click' , (event) => {
        editor.execCommand('Bold',false,null)
    },false)

    let italicButton = document.querySelector("#MdFormatItalic")
    italicButton.addEventListener('click' , (event) => {
        editor.execCommand('italic',false,null)
    },false)

    let underlineButton = document.querySelector("#MdFormatUnderlined")
    underlineButton.addEventListener('click' , (event) => {
        editor.execCommand('Underline',false,null)
    },false)

    let alignJustifyButton = document.querySelector("#MdFormatAlignJustify")
    alignJustifyButton.addEventListener('click' , (event) => {
        editor.execCommand('justifyFull',false,null)
    },false)

    let alignCenterButton = document.querySelector("#MdFormatAlignCenter")
    alignCenterButton.addEventListener('click' , (event) => {
        editor.execCommand('justifyCenter',false,null)
    },false)
    
    let alignLeftButton = document.querySelector("#MdFormatAlignLeft")
    alignLeftButton.addEventListener('click' , (event) => {
        editor.execCommand('justifyLeft',false,null)
    },false)

    let alignRightButton = document.querySelector("#MdFormatAlignRight")
    alignRightButton.addEventListener('click' , (event) => {
        editor.execCommand('justifyRight',false,null)
    },false)

    let linkButton = document.querySelector("#MdInsertLink")
    linkButton.addEventListener('click' , (event) => {
        let URL = prompt('URL을 입력하여 주세요.',"https://")
        editor.execCommand('createLink',false,URL)
    },false)

    let unlinkButton = document.querySelector("#FaUnlink")
    unlinkButton.addEventListener('click' , (event) => {
        editor.execCommand('unlink',false,null)
    },false)
    
    let supButton = document.querySelector("#supButton")
    supButton.addEventListener('click' , () => {
        editor.execCommand('Superscript',false,null)
    },false)

    let formatSizeButton = document.querySelector("#MdFormatSize")
    let formatSizePointer = document.querySelector("#FormatSizeListPointer")
    let formatSizeList = document.querySelector("#FormatSizeList")

    formatSizeButton.addEventListener('click',() => {
        if(formatSizeList.classList.contains('--Hide')){

            FORMAT_SIZE_LIST_SHOW()
            
        }
        else{
            
            FORMAT_SIZE_LIST_HIDE()

        }
    })

    let formatColorTextButton = document.querySelector("#MdFormatColorText")


}

const FORMAT_SIZE_LIST_SHOW = () => {

    let formatSizePointer = document.querySelector("#FormatSizeListPointer")
    let formatSizeList = document.querySelector("#FormatSizeList")

    if(formatSizeList.classList.contains('--Hide')){

        formatSizeList.classList.remove('--Hide')
        formatSizePointer.classList.remove('--Hide')
        formatSizeList.classList.add('--Show')
        formatSizePointer.classList.add('--Show')

    }

}
const FORMAT_SIZE_LIST_HIDE = () => {

    let formatSizePointer = document.querySelector("#FormatSizeListPointer")
    let formatSizeList = document.querySelector("#FormatSizeList")

    if(formatSizeList.classList.contains('--Show')){

        formatSizeList.classList.remove('--Show')
        formatSizePointer.classList.remove('--Show')
        formatSizeList.classList.add('--Hide')
        formatSizePointer.classList.add('--Hide')

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

            }

        }

    }

}

Editor = connect(mapStateToProps,mapDispatchToProps)(Editor)

export default Editor
