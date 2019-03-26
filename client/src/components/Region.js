import React, {Component} from 'react';

function reg(region){
    const regIds = region ?
    region.map(id => {
        return <p id={region}>{id+" "}</p>;
    }) : 'N/A';
	  return <span>{regIds}</span>
}

class Region extends Component { 
    render(){
        return(      
            <p>{reg(this.props.region)}</p>
         )
    } 
    
}
export default Region