import React from 'react'

import { MdFormatBold , MdFormatItalic , MdFormatUnderlined } from 'react-icons/md'
import { MdFormatAlignJustify , MdFormatAlignLeft , MdFormatAlignCenter , MdFormatAlignRight } from 'react-icons/md'
import { MdInsertLink , MdInsertPhoto , MdVideoLibrary , MdFormatColorText , MdFormatSize } from 'react-icons/md'
import { FaUnlink , FaEdit } from 'react-icons/fa'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { AC_CHANGE_VIEW_MODE , AC_CHANGE_MEDIA_MODE } from '../redux/WriteAction.js'

import { ChromePicker } from 'react-color'
import { SERVER_URL } from '../redux/GlobalURL.js'


import TempDocLoader from './TempDocLoader.jsx'
import * as ResizeBullets from './ResizeBullets.js'

import './Editor.scss'

let GlobalObserver;

class Editor extends React.Component{

    constructor(props){

        super(props)
        this.state = {
            iframeToHTML : "",
            isPosting : false,
            isTempSaving : false,
            isShowingTempDoc : false,
            POST_TITLE : "",
            USER_TEMP_DOCS : []
        }

        this.handleEditComplete = this.handleEditComplete.bind(this)
        this.handleInputTitleChange = this.handleInputTitleChange.bind(this)
        this.handleSaveTempDoc = this.handleSaveTempDoc.bind(this)
        this.getUserTempDocs = this.getUserTempDocs.bind(this)
        this.handleShowTempDoc = this.handleShowTempDoc.bind(this)
        
    }

    componentDidMount(){

        this.getUserTempDocs()

        let InnerEditor = RICH_TEXT_AREA.document
        InnerEditor.designMode = "on"
        
        INITIALIZE_SIZE_LISTS(InnerEditor)
        INITIALIZE_EDIT_BUTTONS(InnerEditor)
        INITIALIZE_DROP_EVENTS()
        GlobalObserver = INITIALIZE_MUTATION_OBSERVER()

        InnerEditor.addEventListener('click',(event)=>{
            
            COLOR_PICKER_HIDE()
            FORMAT_SIZE_LIST_HIDE()
            REMOVE_RESIZER_ALL()

        })

        let OuterEditor = document.querySelector("#EDITOR")

        OuterEditor.addEventListener('click',(event) => {

            event.stopPropagation()

        })

    }

    getUserTempDocs(){

        fetch(`${SERVER_URL}/write/getUserTempDocs?user=${window.sessionStorage.getItem('EMAIL')}`,{
            method : 'GET',
            credentials : 'include'
        })
        .then(res=>res.json())
        .then((res) => {
            console.log(res)
            if(res.status === 1){
                this.setState({
                    USER_TEMP_DOCS : res.payload
                })
            }
            
        })
        
    }

    handleColorChange(color,event){

        let InnerEditor = RICH_TEXT_AREA.document
        InnerEditor.execCommand('foreColor',false,color.hex)

    }

    handleChangeViewMode(mode){
        
        if(mode === false){
            let iframeToHTML = RICH_TEXT_AREA.document.body.innerHTML
            RICH_TEXT_AREA.document.body.innerHTML = ""
            RICH_TEXT_AREA.document.body.innerText = iframeToHTML
        }
        else{
            let iframeToHTML = RICH_TEXT_AREA.document.body.innerText
            RICH_TEXT_AREA.document.body.innerHTML = ""
            RICH_TEXT_AREA.document.body.innerHTML = iframeToHTML
        }
        

    }

    handleInputTitleChange(event){

        if(event.target.value.length > 0){
            event.target.classList.add('--Input-Active')
            event.target.nextSibling.classList.add('--Icon-Active')
        }
        else{
            event.target.classList.remove('--Input-Active')
            event.target.nextSibling.classList.remove('--Icon-Active')
        }

        this.setState({
            POST_TITLE : event.target.value
        })

    }

    handleEditComplete(event){

        if(this.state.isPosting){
            return
        }

        let inputValue = this.state.POST_TITLE

        if(inputValue.length > 0){
        
            this.setState({
                isPosting : true,
                POST_TITLE : "포스팅 중 ..."
            })

            let POST_TITLE = inputValue
            let POST_CONTENT = RICH_TEXT_AREA.document.body.innerHTML
            let POST_THUMBNAIL = RICH_TEXT_AREA.document.querySelector('img') ? RICH_TEXT_AREA.document.querySelector('img').src : "none"
            let AUTHOR = window.sessionStorage.getItem('USERNAME')
            let U_IMG_PATH = window.sessionStorage.getItem('U_IMG_PATH').split("/").reverse()[0]
            let EMAIL = window.sessionStorage.getItem('EMAIL')
            let POST_DATE = new Date().getTime()

            fetch(`${SERVER_URL}/write/writeComplete`,{
                method : 'POST',
                credentials : 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({

                    POST_TITLE : POST_TITLE,
                    POST_CONTENT : POST_CONTENT,
                    POST_THUMBNAIL : POST_THUMBNAIL,
                    POST_DATE : POST_DATE,
                    AUTHOR : AUTHOR,
                    U_IMG_PATH : U_IMG_PATH,
                    EMAIL : EMAIL,
                    
                })
            }).then(res=>(res.json())).then((res)=>{
                
                if(res.status === 1){
                    this.setState({
                        isPosting : false
                    })
                    
                    this.props.history.push(`/home?user=${window.sessionStorage.getItem('EMAIL')}`,{
                        reload : true
                    })
                }
                
            })

        }
        else{
            alert('최소한 제목은 작성해 주셔야 합니다.')
            this.setState({
                isPosting : false
            })
        }


    }

    handleSaveTempDoc(){

        if(this.state.POST_TITLE.length === 0){
            return alert('임시 저장시 제목은 필수입니다.')
        }

        if(this.state.isTempSaving){return}

        if(confirm('현재 작성중인 글을 임시 저장 하시겠습니까?')){

            this.setState({
                isTempSaving : true
            })

            fetch(`${SERVER_URL}/write/tempDocSave`,{
                method : 'POST',
                credentials : 'include',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({

                    TEMP_SAVE_TITLE : this.state.POST_TITLE,
                    TEMP_SAVE_CONTENT : RICH_TEXT_AREA.document.body.innerHTML,
                    EMAIL : window.sessionStorage.getItem('EMAIL')

                })
            })
            .then(res=>res.json())
            .then((res) => {
                if(res.status === 1){
                    alert(`성공적으로 임시저장 하였습니다. ${res.DOC_ID}`)
                    this.setState({
                        isTempSaving : false
                    })
                }
            })

        }

    }

    handleShowTempDoc(){
       return this.setState({isShowingTempDoc: !this.state.isShowingTempDoc})
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
                
                    <div onClick={this.handleSaveTempDoc} className="Write-Save">
                        <span className="Write-Save__Text">임시저장</span>
                    </div>

                    <div onClick={this.handleShowTempDoc} className="Show-Temp-Doc">
                        <span className="Write-Save__Text">불러오기</span>
                    </div>

                    <div onClick={()=>{
                        writeDispatch.changeViewMode(true)
                        this.handleChangeViewMode(true)
                    }} className={`View-Item ${writeState.ViewState?('--View-Clicked'):('')}`}>
                        <span className="View-Item-Text">Editor</span>
                    </div>
                    <div onClick={()=>{
                        writeDispatch.changeViewMode(false)
                        this.handleChangeViewMode(false)
                    }} className={`View-Item ${!writeState.ViewState?('--View-Clicked'):('')}`}>
                        <span className="View-Item-Text">HTML</span>
                    </div>
                    
                </div>
            </div>

            <div className="Title-Row">

                <div className="Title-Row__Input-Group">
              
                    <input className="Title-Row__Input-Group__Input" onChange={this.handleInputTitleChange} type="text" value={this.state.POST_TITLE} placeholder="제목을 입력하세요..."/>
                    <FaEdit onClick={this.handleEditComplete} className="Title-Row__Input-Group__Icon" />

                </div>
                
            </div>

            <div>

                <div id="EDITOR">

                    <TempDocLoader tempDocToggler={this.handleShowTempDoc} show={this.state.isShowingTempDoc} docs={this.state.USER_TEMP_DOCS} />
                    <iframe id="RICH_TEXT_AREA"  name="RICH_TEXT_AREA" frameBorder="0"></iframe>

                </div>

                <div>

                </div>

            </div>

        </div>

        )
    }


}

const REMOVE_RESIZER_ALL = () => {

    GlobalObserver.disconnect()

    let InnerEditor = RICH_TEXT_AREA.document
    let BulletWrappers = InnerEditor.querySelectorAll('.Resize-Wrapper')
    if(BulletWrappers.length > 0){

        BulletWrappers.forEach((el) => {

            let ChildImage = el.querySelector('img')
            ChildImage.draggable = true
            ChildImage.addEventListener('click',(event)=>{
                event.stopPropagation()
                REMOVE_RESIZER_ALL()
                INITIALIZE_IMAGE_RESIZER(event.target)
            })

            el.replaceWith(ChildImage)
            el.remove()

        })

    }

    GlobalObserver = INITIALIZE_MUTATION_OBSERVER()

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
    
    let BulletSize = '10px'

    TotalBulletsControl.forEach((el)=>{

        el.style.position = 'absolute'
        el.style.borderRadius = '50%'
        el.style.backgroundColor = 'white'
        el.style.width = BulletSize
        el.style.height = BulletSize
        el.style.border = '2px solid black'

    })

    ResizeBullets.DECISION_BULLETS_POSITION(TotalBulletsControl,BulletSize)
    ResizeBullets.ATTACH_RESIZE_HANDLER(TotalBulletsControl)

    let ResizeWrapper = document.createElement('div')
    let ClonedTargetImage = targetImage.cloneNode()
    ClonedTargetImage.draggable = false

    ResizeWrapper.classList.add('Resize-Wrapper')
    ResizeWrapper.style.position = 'relative'
    // ResizeWrapper.style.border = '1px solid black'
    ResizeWrapper.style.display = 'inline-block'

    ResizeWrapper.appendChild(ClonedTargetImage)
    
    TotalBulletsControl.forEach((el) => {
        ResizeWrapper.appendChild(el)
    })
    
    targetImage.replaceWith(ResizeWrapper)
    targetImage.remove()
    
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
                    el.draggable = true
                    // el.width = parseInt((el.naturalWidth)/5)
                    // el.height = parseInt((el.naturalHeight)/5)
                    el.style.maxWidth = '100%'
                    el.style.height = 'auto !important'
                    el.addEventListener('click',(event)=>{
                        event.stopPropagation()
                        REMOVE_RESIZER_ALL()
                        INITIALIZE_IMAGE_RESIZER(event.target)
                        
                    })

                }

                if(el.tagName === 'DIV' && el.classList.contains('Resize-Wrapper')){

                    el.addEventListener('click',(event)=>{
                        event.stopPropagation()
                    })

                }

            })
            
        })
    })

    let config = { attributes: true, childList: true, characterData: true , subtree: true }

    Observer.observe(InnerEditorBody,config)
    return Observer
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
