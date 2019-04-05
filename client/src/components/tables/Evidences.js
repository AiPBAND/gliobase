import React, {Component} from 'react';
import {Table} from 'antd';
import BioID from '../tags/BioID';
import Marker from '../utilities/Marker';
import BiomoleculeList from '../lists/BiomoleculeList';

const columns = [{
	title: 'PMID - ID',
	dataIndex: 'id',
	key: 'id',
	width: 180,
	render: (id, record) => (
		<BioID id={id} name={record.pmid} key={id}></BioID>
	)
},{
	title: 'Biomarker',
	dataIndex: 'biomarkerId',
	key: 'biomarkerId',
	width: 180,
	render: val => {
		return <BioID id={val} name=""/>
	}
},{
	title: 'Biomolecules',
	dataIndex: 'biomarker.biomolecules',
	key: 'biomolecules',
	render: (biomolecules) => {
		const listIds = biomolecules.map(en => {
			return <BioID id={en.id} name={en.shortName} key={en.id}></BioID>;
		})
		if(listIds.length > 5) {
			listIds.length = 5
			listIds.push(<span>...</span>)
		}
		return <span>{listIds}</span>
	}
},{
	title: 'Validated',
	dataIndex: 'application.validated',
	key: 'validated',
	align: 'center',
	width: 30,
	render: val => (
		<Marker val={val}></Marker> 
	)	
},{
	title: 'Diagnostic',
	dataIndex: 'application.diagnosis',
	key: 'diagnosis',
	align: 'center',
	width: 30,
	render: val => (
		<Marker val={val}></Marker> 
	)	
},{
	title: 'Predictive',
	dataIndex: 'application.predictive',
	key: 'predictive',
	align: 'center',
	width: 30,
	render: val => (
		<Marker val={val}></Marker> 
	)	
},{
	title: 'Prognostic',
	dataIndex: 'application.prognosis',
	key: 'prognosis',
	align: 'center',
	width: 30,
	render: val => (
		<Marker val={val}></Marker> 
	)	
},{
	title: 'Therapeutic',
	dataIndex: 'application.therapeutic',
	key: 'therapeutic',
	align: 'center',
	width: 30,
	render: val => (
		<Marker val={val}></Marker> 
	)	
}];

const expanded = (record) => {
	return <BiomoleculeList data={record.biomarker.biomolecules}></BiomoleculeList>
}

class Evidences extends Component {
	render() {
		return <Table columns={columns} 
			dataSource={this.props.data} rowKey="id" expandedRowRender={expanded}/>
	}
}

export default Evidences