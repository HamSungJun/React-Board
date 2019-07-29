import React from 'react'

import './TempDocLoader.scss'
import {SERVER_URL} from '../redux/GlobalURL.js'

class TempDocLoader extends React.Component{

    constructor(props){
        super(props)
        this.handleGetTempDocContent = this.handleGetTempDocContent.bind(this)
    }

    handleGetTempDocContent(_id){
        
        return fetch(`${SERVER_URL}/write/getTempDocContent?_id=${_id}`,{
            method : 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res=>res.json())
        .then((res) => {
            console.log(res)
            if(confirm('불러올까요?')){
                RICH_TEXT_AREA.document.body.innerHTML = ""
                RICH_TEXT_AREA.document.body.innerHTML = res["payload"][0]["TEMP_SAVE_CONTENT"]
                this.props.tempDocToggler()
            }

        })

    }

    render(){
        return(
            <div className={`TempDocLoader-Container ${this.props.show?(""):("--Hide")}`}>
                {renderTempDocs(this.props.docs,this.handleGetTempDocContent)}
            </div>
        )
    }    
}

const renderTempDocs = (docs,handler) => {
    
    docs.sort((a,b) => {
        return new Date(b.TEMP_SAVE_DATE) - new Date(a.TEMP_SAVE_DATE)
    })
    
    return docs.map((el,index) => {
        return (
            <div onMouseDown={()=>{handler(el._id)}} className='TempDocLoader-Container__Item' key={index}>
                <div className='TempDocLoader-Container__Item__Title'>
                    <span>{el.TEMP_SAVE_TITLE}</span>
                </div>
                <div className='TempDocLoader-Container__Item__Sub'>

                    <div>
                        <span>{(el._id).substr(0,Math.floor(el._id.length/2))}</span>
                    </div>

                    <div>
                        <span>{new Date(el.TEMP_SAVE_DATE).toJSON().substr(0,10)}</span>
                    </div>
                    
                </div>
            </div>
        )
    })

}

export default TempDocLoader