import React, {Component} from 'react';
import {Icon, Popover} from 'antd';
import './Marker.css';

const getIcon = (mess) => {
	if (mess === "Yes" || mess === "YES") return "check-circle"
	if (mess === "No" || mess === "NO") return "stop"
	if (mess === "Potential" || mess === "POTENTIAL") return "info-circle"
	return "minus-circle"
}

const getColor = (mess) => {
	if (mess === "Yes" || mess === "YES") return "#52c41a"
	if (mess === "No" || mess === "NO") return "red"
	if (mess === "Potential" || mess === "POTENTIAL") return "blue"
    return "gray"
}

const getPopover = (mess) => {
	if (mess === "Yes" || mess === "YES") return "Yes"
	if (mess === "No" || mess === "NO") return "No"
	if (mess === "Potential" || mess === "POTENTIAL") return "Potential"
	return "Unavailable"
}

class Marker extends Component {
	render() {
		return <Popover content={getPopover(this.props.val)}>
			<Icon 
			type={getIcon(this.props.val)}
			className="marker-margin"
			theme="twoTone"
			twoToneColor={getColor(this.props.val)}
			style={{ fontSize: '16px' }}/>
  		</Popover>
	}
}

export default Marker