import React, {Component} from 'react';
import {Icon, Table} from 'antd';

const getIcon = (mess) => {
	if (mess === "Yes" || mess === "YES") return "check-circle"
	if (mess === "No" || mess === "NO") return "stop"
	if (mess === "Potential" || mess === "POTENTIAL") return "info-circle"
	return "warning"
}

const getColor = (mess) => {
	if (mess === "Yes" || mess === "YES") return "green"
	if (mess === "No" || mess === "NO") return "red"
	if (mess === "Potential" || mess === "POTENTIAL") return "blue"
	return "grey"
}

const renderIcon = (val) => {
	return <Icon 
	type={getIcon(val)}
	theme="twoTone"
	twoToneColor={getColor(val)}
	style={{ fontSize: '16px' }} />
}

const columns = [{
	title: 'ID',
	dataIndex: 'id',
	key: 'id',
	render: id => <a href={"/evidence/"+id}>{id}</a>,
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