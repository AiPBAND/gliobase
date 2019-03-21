import React, {Component} from 'react';
import { Tag } from 'antd';
  
const colors = {
	"DNA": "#003a8c",
	"RNA": "#1890ff",
	"Protein": "#13c2c2",
	"Others": "#006d75"
}

class Category extends Component {
	render() {
		return (
            <Tag color={colors[this.props.name]}>{this.props.name}</Tag>
        )
	}
}
export default Category