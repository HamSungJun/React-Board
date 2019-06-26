import React from 'react'

import { MdFormatBold , MdFormatItalic , MdFormatUnderlined } from 'react-icons/md'
import { MdFormatAlignJustify , MdFormatAlignLeft , MdFormatAlignCenter , MdFormatAlignRight } from 'react-icons/md'
import { MdInsertLink , MdInsertPhoto , MdVideoLibrary , MdFormatColorText , MdFormatSize } from 'react-icons/md'
import { FaUnlink } from 'react-icons/fa'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { AC_CHANGE_VIEW_MODE , AC_CHANGE_MEDIA_MODE } from '../redux/WriteAction.js'
import { ChromePicker } from 'react-color'

import * as ResizeBullets from './ResizeBullets.js'

import './Editor.scss'

class Editor extends React.Component{

    constructor(props){

        super(props)

    }

    componentDidMount(){

        let InnerEditor = RICH_TEXT_AREA.document
        InnerEditor.designMode = "on"
        
        INITIALIZE_SIZE_LISTS(InnerEditor)
        INITIALIZE_EDIT_BUTTONS(InnerEditor)
        INITIALIZE_DROP_EVENTS()
        INITIALIZE_MUTATION_OBSERVER()

        InnerEditor.addEventListener('click',(event)=>{
            
            COLOR_PICKER_HIDE()
            FORMAT_SIZE_LIST_HIDE()
            REMOVE_BEFORE_RESIZER()

        })

        let OuterEditor = document.querySelector("#EDITOR")

        OuterEditor.addEventListener('click',(event) => {

            event.stopPropagation()

        })

    }

    handleColorChange(color,event){

        let InnerEditor = RICH_TEXT_AREA.document
        InnerEditor.execCommand('foreColor',false,color.hex)

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
                        <div className="Color-Picker-Box --Hide">
                            <ChromePicker
                                triangle={'hide'}
                                onChangeComplete={this.handleColorChange}
                            />
                        </div>
                    </div>

                    <div className="EditTools-Grid-Container__Item Format-Size">
                        <MdFormatSize id="MdFormatSize" className="EditTools-Item__Icon" />
                        <div id="FormatSizeListPointer" className="top-pointing-triangle --Hide"></div>
                        <div id="FormatSizeList" className="--Hide"> 
                            
                        </div>
                    </div>
                    <div onClick={()=>{
                        writeDispatch.changeMediaMode(true)
                    }} className="EditTools-Grid-Container__Item">
                        <MdInsertPhoto id="MdInsertPhoto" className="EditTools-Item__Icon" />
                    </div>
                    <div onClick={()=>{
                        writeDispatch.changeMediaMode(false)
                    }} className="EditTools-Grid-Container__Item">
                        <MdVideoLibrary id="MdVideoLibrary" className="EditTools-Item__Icon" />
                    </div> 
                </div>

                <div className="Nested-Flex-View">
                
                    <div onClick={()=>{
                        writeDispatch.changeViewMode(true)
                    }} className={`View-Item ${writeState.ViewState?('--View-Clicked'):('')}`}>
                        <span className="View-Item-Text">Editor</span>
                    </div>
                    <div onClick={()=>{
                        writeDispatch.changeViewMode(false)
                    }} className={`View-Item ${!writeState.ViewState?('--View-Clicked'):('')}`}>
                        <span className="View-Item-Text">HTML</span>
                    </div>
                    
                </div>
            </div>

            <div>

                <div id="EDITOR">

                    <iframe id="RICH_TEXT_AREA"  name="RICH_TEXT_AREA" frameBorder="0"></iframe>

                </div>

                <div>

                </div>

            </div>

        </div>

        )
    }


}

const REMOVE_BEFORE_RESIZER = () => {

    let InnerEditor = RICH_TEXT_AREA.document
    let BulletWrappers = InnerEditor.querySelectorAll('.Resize-Wrapper')

    BulletWrappers.forEach((el) => {
        
        let ChildImageClone = el.querySelector('img')
        el.replaceWith(ChildImageClone)
        el.remove()

    })

}

const INITIALIZE_IMAGE_RESIZER = (targetImage) => {

    let InnerEditor = RICH_TEXT_AREA.document
    let InnerEditorBody = RICH_TEXT_AREA.document.body

    let TotalBulletsControl = []

    let TopLeftResizeBullet = InnerEditor.createElement('div')
    let TopResizeBullet = InnerEditor.createElement('div')
    let TopRightResizeBullet = InnerEditor.createElement('div')

    let MidLeftResizeBullet = InnerEditor.createElement('div')
    let MidRightResizeBullet = InnerEditor.createElement('div')

    let BottomLeftResizeBullet = InnerEditor.createElement('div')
    let BottomResizeBullet = InnerEditor.createElement('div')
    let BottomRightResizeBullet = InnerEditor.createElement('div')

    TotalBulletsControl.push(

        TopLeftResizeBullet,
        TopResizeBullet,
        TopRightResizeBullet,
        MidLeftResizeBullet,
        MidRightResizeBullet,
        BottomLeftResizeBullet,
        BottomResizeBullet,
        BottomRightResizeBullet

    )
    
    let BulletSize = '6px'

    TotalBulletsControl.forEach((el)=>{
        el.style.position = 'absolute'
        el.style.borderRadius = '50%'
        el.style.backgroundColor = 'white'
        el.style.width = BulletSize
        el.style.height = BulletSize
        el.style.border = '2px solid black'
    })

    ResizeBullets.DECISION_BULLETS_POSITION(TotalBulletsControl,BulletSize)

    let ResizeWrapper = document.createElement('div')
    let ClonedTargetImage = targetImage.cloneNode()
    ResizeWrapper.classList.add('Resize-Wrapper')
    ResizeWrapper.style.position = 'relative'
    // ResizeWrapper.style.border = '1px solid black'
    ResizeWrapper.style.display = 'inline-block'

    ResizeWrapper.appendChild(ClonedTargetImage)
    
    TotalBulletsControl.forEach((el) => {
        ResizeWrapper.appendChild(el)
    })
    
    targetImage.replaceWith(ResizeWrapper)
    
}

const INITIALIZE_MUTATION_OBSERVER = () => {

    let InnerEditorBody = RICH_TEXT_AREA.document.body
    
    let Observer = new WebKitMutationObserver((mutations)=>{
        mutations.forEach((mutation)=>{
           
            // console.log(mutation.addedNodes)

            mutation.addedNodes.forEach((el)=>{

                console.log(el.tagName)

                if(el.tagName === 'IMG'){

                    el.classList.remove('Frame-Image')
                    
                    el.width = parseInt((el.naturalWidth)/5)
                    el.height = parseInt((el.naturalHeight)/5)

                    el.addEventListener('click',(event)=>{
                        event.stopPropagation()
                        REMOVE_BEFORE_RESIZER()
                        INITIALIZE_IMAGE_RESIZER(event.target)
                    })

                }

            })
            
        })
    })

    let config = { attributes: true, childList: true, characterData: true , subtree: true }

    Observer.observe(InnerEditorBody,config)

}

const INITIALIZE_DROP_EVENTS = () => {

    let InnerEditorBody = RICH_TEXT_AREA.document.body
    let cancelDropEvents = ['dragOver', 'dragEnter']

    cancelDropEvents.forEach((el)=>{
        InnerEditorBody.addEventListener(el,(event)=>{
            event.preventDefault()
            event.stopPropagation()
        })
    })

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
            COLOR_PICKER_HIDE()

        }
        else{
            
            FORMAT_SIZE_LIST_HIDE()

        }
    })

    let formatColorTextButton = document.querySelector("#MdFormatColorText")
    formatColorTextButton.addEventListener('click',()=>{

        let ColorPickerBox = document.querySelector('.Color-Picker-Box')
        if(ColorPickerBox.classList.contains('--Hide')){

            COLOR_PICKER_SHOW()
            FORMAT_SIZE_LIST_HIDE()

        }
        else{

            COLOR_PICKER_HIDE()

        }

    })

}

const COLOR_PICKER_HIDE = () => {

    let ColorPickerBox = document.querySelector('.Color-Picker-Box')

    if(ColorPickerBox.classList.contains('--Show')){
        ColorPickerBox.classList.remove('--Show')
        ColorPickerBox.classList.add('--Hide')
    }

}
const COLOR_PICKER_SHOW = () => {

    let ColorPickerBox = document.querySelector('.Color-Picker-Box')

    if(ColorPickerBox.classList.contains('--Hide')){
        ColorPickerBox.classList.remove('--Hide')
        ColorPickerBox.classList.add('--Show')
    }

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

            changeViewMode(mode){

                dispatch(AC_CHANGE_VIEW_MODE(mode))

            },
            changeMediaMode(mode){
                
                dispatch(AC_CHANGE_MEDIA_MODE(mode))

            }
        }

    }

}

Editor = withRouter(connect(mapStateToProps,mapDispatchToProps)(Editor))

export default Editor
