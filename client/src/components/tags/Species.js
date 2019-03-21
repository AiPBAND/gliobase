import React, {Component} from 'react';
import { Tag } from 'antd';
  
const colors = {
	"Homo Sapiens": "#22075e",
	"Mus Musculus": "#eb2f96",
	"Macaca mulatta": "#722ed1"
}

class Species extends Component {
	render() {
		return (
            <Tag color={colors[this.props.name]}>{this.props.name}</Tag>
        )
	}
}
export default Species