import React, {Component} from 'react';
import { Tag } from 'antd';
  
const colors = {
	"Tissue": "#871400",
	"CSF": "#fa541c",
	"Blood": "#f5222d",
	"Serum": "#820014",
	"Cell line": "#873800",
	"Cells": "#d46b08",
	"Others": "#fa8c16"
}

class Source extends Component {
	render() {
		return (
            <Tag color={colors[this.props.name]}>{this.props.name}</Tag>
        )
	}
}
export default Source