import React, {Component} from 'react';
import { Tag } from 'antd';
  
class BioID extends Component {
	render() {
        function refLink(ref) {
			if (ref.charAt(0) === "E") return "entity";
			if (ref.charAt(0) === "V") return "evidence";
			if (ref.charAt(0) === "B") return "biomarker";
			else return "notfound";
		}
		return <Tag>
			<a href={"/"+refLink(this.props.id)+"/"+this.props.id}>{this.props.id}</a>
		</Tag>
	}
}
export default BioID