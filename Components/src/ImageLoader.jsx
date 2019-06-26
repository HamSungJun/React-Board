import React from 'react'

import {connect} from 'react-redux'

import { MdPhotoLibrary , MdFolderOpen , MdWifi } from 'react-icons/md'

import { SERVER_SHAREDIMAGES_URL } from '../redux/GlobalURL.js'

import './ImageLoader.scss'

class ImageLoader extends React.Component{

    constructor(props){

        super(props)
        this.state = {
            ImageBasket : []
        }
        this.fileInput = React.createRef()
        this.renderImageLists = this.renderImageLists.bind(this)
        this.handleFileInputChange = this.handleFileInputChange.bind(this)

    }

    componentDidMount() {

        let empty24Array = []
        for (let index = 0; index <= 23; index ++){
            empty24Array.push("")
        }

        this.setState({
            ImageBasket : empty24Array
        })

    }

    renderImageLists(ImageBasket){

        return ImageBasket.map((el,index) => {
            if(el === ""){
                return(
                    <div key={index} className='Image-Loader-Lists__Item'>
                        <div className='Frame-Icon'></div>
                    </div>
                )
            }
            else{
                return(
                    <div key={index} className='Image-Loader-Lists__Item'>
                        <img
                        draggable={true} 
                        onDragStart={handleDragStart} 
                        
                        className='Frame-Image' src={el} alt=""/>
                    </div>
                )
            }
         
        })

    }

    handleActivateFileBrowser(){

        let fileInput = document.getElementById('File-Input')
        fileInput.value = ''

        let myEvent = document.createEvent('MouseEvents')
        myEvent.initEvent('click',false,true)
        fileInput.dispatchEvent(myEvent)

    }

    handleFileInputChange(event){
        
        let fileInput = document.getElementById('File-Input')
        let files = fileInput.files
        let myImageBasket = this.state.ImageBasket
        
        for (let index = 0; index < files.length; index++) {
        
            if(files.item(index)){
                
                let myFormData = new FormData()
                myFormData.append('file',files.item(index))

                fetch('http://localhost:3000/write/imageUpload',{

                    method : 'POST',
                    body : myFormData

                }).then(res=>res.json()).then((res)=>{

                    myImageBasket.unshift(`${SERVER_SHAREDIMAGES_URL}${res.loc}`)
                    myImageBasket.pop()
    
                    this.setState({
                        ImageBasket : myImageBasket
                    })
                    
                    
                })

                
            }
            
        }

    }
    render(){

        const { writeState } = this.props

        return (

            <div className={`Image-Loader-Wrapper ${!writeState.MediaState?('--Hide'):('--Show')}`}>

                <div className='Image-Loader-Header'>
                    <div className='Image-Loader-Header__Item'>
                        <MdPhotoLibrary className='Image-Loader-Icon'/>
                    </div>
                    <div className='Image-Loader-Header__Item'>
                        <span>Photo Library</span>
                    </div>
                </div>

                <div className='Image-Loader-Lists'>
                    {this.renderImageLists(this.state.ImageBasket)}
                </div>
                <div className='Image-Loader-Controller'>

                    <div className='Image-Loader-Controller__Row'>

                        <div className='Image-Loader-Controller__Row__Item'>
                            <input ref={this.fileInput}
                                   id='File-Input'
                                   onInput={(event)=>{this.handleFileInputChange(event)}}
                                   onClick={(event)=> {event.target.value = null}}
                                   className={'--Hide'} type="file" multiple={true} accept={'image/*'}/>
                            <button onClick={this.handleActivateFileBrowser} className='File-Btn'><MdFolderOpen className='File-Icon'/>Browse</button>
                        </div>

                        <div className='Image-Loader-Controller__Row__Item'>
                            <button className='File-Btn'><MdWifi className='File-Icon'/>Insert URL</button>
                        </div>

                    </div>

                </div>

            </div>

        )

    }

}

const handleDragStart = (event) => {
   
    event.dataTransfer.setData("text",event.target.src)
    console.log(event.target.src)
  
}

const mapStateToProps = (state) => {
    return {
        writeState : state.write
    }
}

ImageLoader = connect(mapStateToProps , null)(ImageLoader)

export default ImageLoader