import React, {Component} from 'react';

class Region extends Component { 
    render(){
		const regIds = this.props.region ? this.props.region.map(id => {
			return <p key={id}>{id+" "}</p>;
		}) : 'N/A';
		return <span>{regIds}</span>
    } 
}
export default Region