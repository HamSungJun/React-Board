import React from 'react'
import './AticleFilter.scss'
import {MdFilter, MdUpdate, MdPhotoFilter, MdTrendingUp , MdTrendingDown, MdInsertPhoto} from 'react-icons/md'
import {FaReplyd, FaEye, FaThumbsUp, FaSortAmountUp, FaSortAmountDown} from 'react-icons/fa'

class ArticleFilter extends React.Component{

    constructor(props){

        super(props)

        this.state = {
            REPLY : "RESET",
            EYE : "RESET",
            TIME : "RESET",
            THUMB : "RESET",
        }

        this.handleFilterClick = this.handleFilterClick.bind(this)
        this.renderQueryOptions = this.renderQueryOptions.bind(this)
    }

    handleFilterClick(e,type,order){

        let stateNow = this.state
        
        if(stateNow[type] === order){
            stateNow[type] = "RESET"
            return this.setState(stateNow)
        }
        else{
            stateNow[type] = order
            return this.setState(stateNow)
        }
 
    }

    renderQueryOptions(){

        const OPTIONS = [

            <FaReplyd className="Query-Icon" id="REPLY"/>,
            <FaEye className="Query-Icon" id="EYE"/>,
            <MdUpdate className="Query-Icon" id="TIME"/>,
            <FaThumbsUp className="Query-Icon" id="THUMB"/>,
            
        ]

        const UP_ICON = () => {
            return <MdTrendingUp className="Query-Icon" />
        }

        const DOWN_ICON = () => {
            return <MdTrendingDown className="Query-Icon" />
        }

        let filters = OPTIONS.map((el,index,array) => {
            
            return (

                <div key={index} className="Filter-Item">

                    <div className={`${this.state[el.props.id] === 'UP' ? ("--Icon-Selected") : ("")}`} onClick={(e)=>{
                        this.handleFilterClick(e,el.props.id,'UP')
                    }}>
                        {<UP_ICON />}
                    </div>

                    <div onClick={(e)=>{
                        this.handleFilterClick(e,el.props.id,'RESET')
                    }}>
                        {el}
                    </div>

                    <div className={`${this.state[el.props.id] === 'DOWN' ? ("--Icon-Selected") : ("")}`} onClick={(e)=>{
                        this.handleFilterClick(e,el.props.id,'DOWN')
                    }}>
                        {<DOWN_ICON />}
                    </div>

                </div>

            )

        })

        return filters

    }

    render(){
        return(
            <div className="Filter-Wrapper">
                <div className="Filter-Header">
                    <MdFilter id="FILTER" />
                    <span>Filter</span>
                </div>
                {this.renderQueryOptions()}
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
}



export default ArticleFilter