import React, {Component} from 'react';

function regData(reg){
    if (reg !== -1){
      return (reg)
    }
    else {
        return("NA")
    }
}
function reg(region){
    const regIds = region.map(id => {
        return <p id={region}>{id+" "}</p>;
     })
	  return <span>{regIds}</span>
  }
class Region extends Component { 
    render(){
        return(      
            <p>{reg(regData(this.props.region))}</p>
         )
    } 
    
}
export default Region