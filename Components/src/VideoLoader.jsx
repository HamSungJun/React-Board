import React from 'react'

import { connect } from 'react-redux'

class VideoLoader extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            VideoBasket : []
        }

    }

    render(){

        const { writeState } = this.props

        return (

            <div className={`Video-Loader-Wrapper ${writeState.MediaState?('--Hide'):('--Show')}`}>
                <h3>비디오 로더</h3>
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        writeState : state.write
    }
}

VideoLoader = connect(mapStateToProps , null)(VideoLoader)

export default VideoLoader