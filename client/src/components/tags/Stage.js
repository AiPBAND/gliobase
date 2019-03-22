import React, {Component} from 'react';
import { Tag } from 'antd';
import { StageColors } from '../../commons/ColorSettings';
  
class Stage extends Component {
	render() {
		return (
      <Tag color={StageColors[this.props.name]}>{this.props.name}</Tag>
    )
	}
}
export default Stage