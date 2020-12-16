import React, {Component} from 'react'
import Kosong from '../../View/Penjual/kosong'

class NoResult extends Component{
    clicked(){
        this.props.click()
    }
    render(){
        return(
            <div className='fallback'>
                <Kosong/>
                <p>Wanna try most <b onClick={this.props.click}>searched movies</b> instead?</p>
            </div>
        )
    }
}
export default NoResult