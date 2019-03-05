import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Write extends React.Component{

    render(){
        return(
            <div>
                <h1>Write</h1>
            </div>
        )
    }

}

const mapStateToProps = () => {
    return {
        
    }
}
const mapDispatchToProps = () => {
    return {

    }
}

Write = withRouter(connect(null,null)(Write))

export default Write