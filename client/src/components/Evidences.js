import React, {Component} from 'react';
import {Icon, Table, Popover} from 'antd';
import BioID from './tags/BioID';
import Marker from './../Utilities/Marker';
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
	render: val => (
		<Marker val={val}></Marker> 
	)	
},{
	title: 'Diagnosis',
	dataIndex: 'application.diagnosis',
	key: 'diagnosis',
	render: val => (
		<Marker val={val}></Marker> 
	)	
},{
	title: 'Predictive',
	dataIndex: 'application.predictive',
	key: 'predictive',
	render: val => (
		<Marker val={val}></Marker> 
	)	
},{
	title: 'Prognostis',
	dataIndex: 'application.prognosis',
	key: 'prognosis',
	render: val => (
		<Marker val={val}></Marker> 
	)	
},{
	title: 'Therapeutic',
	dataIndex: 'application.therapeutic',
	key: 'therapeutic',
	render: val => (
		<Marker val={val}></Marker> 
	)	
}];

class Evidences extends Component {
	render() {
		return <Table columns={columns} dataSource={this.props.data} />
	}
}

export default Evidences