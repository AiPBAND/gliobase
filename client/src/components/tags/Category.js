import React, {Component} from 'react';
import { Tag } from 'antd';
import {CategoryColors} from '../../commons/ColorSettings';

class Category extends Component {
	render() {
		return (
      <Tag color={CategoryColors[this.props.name]}>{this.props.name}</Tag>
    )
	}
}
export default Category