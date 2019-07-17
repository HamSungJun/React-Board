import React from 'react'

import './TempDocLoader.scss'

class TempDocLoader extends React.Component{

    constructor(props){
        super(props)

    }

    renderTempDocs(){
        console.log(this.props.docs)
    }

    render(){
        return(
            <div className="TempDocLoader-Container">
                {this.renderTempDocs()}
            </div>
        )
    }    
}

export default TempDocLoader