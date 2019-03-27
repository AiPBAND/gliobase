import React, {Component} from 'react';
import {Table} from 'antd';
import BioID from '../tags/BioID';
import Marker from '../utilities/Marker';
const columns = [{
	title: 'PMID - ID',
	dataIndex: 'id',
	key: 'id',
	render: (id, record) => (
		<BioID id={id} name={record.pmid} key={id}></BioID>
	)
},{
	title: 'Biomarker',
	dataIndex: 'biomarkerId',
	key: 'biomarkerId',
	render: val => {
		return <BioID id={val} name="Biomarker"/>
	}
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
		return <Table columns={columns} dataSource={this.props.data} rowKey="id"/>
	}
}

export default Evidences