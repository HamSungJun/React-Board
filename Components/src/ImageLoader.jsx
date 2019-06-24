import React from 'react'

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
        // this.handleFileInputChange = this.handleFileInputChange(this)

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
            return(
                <div key={index} className='Image-Loader-Lists__Item'>
                    <div className='Frame-Icon'></div>
                </div>
            )
        })

    }

    handleActivateFileBrowser(){

        let fileInput = document.getElementById('File-Input')
        let myEvent = document.createEvent('MouseEvents')
        myEvent.initEvent('click',false,true)
        fileInput.dispatchEvent(myEvent)

    }

    handleFileInputChange(event){


        console.log(event.target.files)


    }
    render(){

        return (

            <div className='Image-Loader-Wrapper'>

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

export default ImageLoader