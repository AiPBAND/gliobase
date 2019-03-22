import React, {Component} from 'react';
import { Tag } from 'antd';
import { SpeciesColors } from '../../commons/ColorSettings';

class Species extends Component {
	render() {
		return (
      <Tag color={SpeciesColors[this.props.name]}>{this.props.name}</Tag>
    )
	}
}
export default Species