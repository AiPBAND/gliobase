import React, {Component} from 'react';
import { Tag } from 'antd';
  
class BioID extends Component {
	render() {
        function refLink(ref){
          if (ref.charAt(0) === "E"){
            return ("entity")
          }
          else if (ref.charAt(0) === "V"){
            return ("evidence")
          }
          else{
            return ("biomarker")
          }
        }
		    return (
            <Tag><a href= {"/"+refLink(this.props.id)+"/"+this.props.id}> {this.props.id} </a>
            </Tag>
        )
	}
}
export default BioID