import React, {Component} from 'react';
import { Tag } from 'antd';
  
const colors = {
	"I": "blue",
	"II": "green",
	"III": "yellow",
	"IV": "orange",
	"V": "red"
}

class Stage extends Component {
	render() {
		return (
            <Tag color={colors[this.props.name]}>{this.props.name}</Tag>
        )
	}
}
export default Stage