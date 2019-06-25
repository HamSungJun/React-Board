import React from 'react'

import {connect} from 'react-redux'

import { MdPhotoLibrary , MdFolderOpen , MdWifi } from 'react-icons/md'

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
                    <img className='Frame-Image' src={el} alt=""/>
                </div>
                )
            }
         
        })

    }

    handleActivateFileBrowser(){

        let fileInput = document.getElementById('File-Input')
        let myEvent = document.createEvent('MouseEvents')
        myEvent.initEvent('click',false,true)
        fileInput.dispatchEvent(myEvent)

    }

    handleFileInputChange(event){
        
        let fileInput = document.getElementById('File-Input')
        let files = fileInput.files
        let myImageBasket = this.state.ImageBasket
        
        for (let index = 0; index < files.length; index++) {
        
            let myFileReader = new FileReader()

            myFileReader.addEventListener('load',()=>{
                
                console.log(files.item(index).type.split('/')[1])
                
               


                // fetch('http://localhost:3000/write/imageUpload',{

                //     method : 'POST',
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     },
                //     body : JSON.stringify({ 
                //         data : myFileReader.result
                //     })

                // }).then(res=>res.json()).then((res)=>{
                //     if(res.status === 1){
                //         myImageBasket.unshift(myFileReader.result)
                //         myImageBasket.pop()
                //         this.setState({
                //             ImageBasket : myImageBasket
                //         })
                //     }
                // })

            },false)

            if(files.item(index)){

                let myFormData = new FormData()

                myFormData.set('title',`React-Board_${new Date(files.item(index).lastModifiedDate).toJSON().substr(0,10).replace(/-/g,"")}_${new Date().getTime()}`)
                myFormData.set('ext',`${files.item(index).type.split('/')[1]}`)


                myFileReader.readAsDataURL(files.item(index))
            }
            
        }

        console.log(myImageBasket)

        


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

const mapStateToProps = (state) => {
    return {
        writeState : state.write
    }
}

ImageLoader = connect(mapStateToProps , null)(ImageLoader)

export default ImageLoader