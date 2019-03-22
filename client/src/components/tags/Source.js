import React, {Component} from 'react';
import { Tag } from 'antd';
import { SourceColors } from '../../commons/ColorSettings';

class Source extends Component {
	render() {
		return (
      <Tag color={SourceColors[this.props.name]}>{this.props.name}</Tag>
    )
	}
}
export default Source