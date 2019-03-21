import React, {Component} from 'react';
import {Icon, Table, Popover} from 'antd';
import BioID from './BioID';

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

const renderIcon = (val) => {
	return <Popover content={getPopover(val)}>
		<Icon 
		type={getIcon(val)}
		theme="twoTone"
		twoToneColor={getColor(val)}
		style={{ fontSize: '16px' }} />
  	</Popover>
}

const columns = [{
	title: 'ID',
	dataIndex: 'id',
	key: 'id',
	render: id => (
		<BioID id={id}></BioID>
	)
},{
	title: 'Validated',
	dataIndex: 'application.validated',
	key: 'validated',
	render: val => renderIcon(val)
},{
	title: 'Diagnosis',
	dataIndex: 'application.diagnosis',
	key: 'diagnosis',
	render: val => renderIcon(val)
},{
	title: 'Predictive',
	dataIndex: 'application.predictive',
	key: 'predictive',
	render: val => renderIcon(val)
},{
	title: 'Prognostis',
	dataIndex: 'application.prognosis',
	key: 'prognosis',
	render: val => renderIcon(val)
},{
	title: 'Therapeutic',
	dataIndex: 'application.therapeutic',
	key: 'therapeutic',
	render: val => renderIcon(val)
}];

class Evidences extends Component {
	render() {
		return <Table columns={columns} dataSource={this.props.data} />
	}
}

export default Evidences