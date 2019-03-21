import React, {Component} from 'react';
import { loader } from 'graphql.macro';
import Table from 'antd/lib/table';
import { Tag } from 'antd';
import BioID from './BioID';
const biomarkersQuery = loader('../queries/biomarkerSets.graphql');

const columns = [{
	title: 'ID',
	dataIndex: 'id',
	key: 'id',
	render: id => (
		<BioID id={id}/>
	)
  },{
	title: 'Biomarkers',
	dataIndex: 'biomarkerIds',
	key: 'biomarkerIds',
	render: (ids) => {
		const listIds = ids.map(id => {
		return <BioID id={id}>{id+" "}</BioID>;
		})
		return <span>{listIds}</span>
	}
  }];
  

class BiomarkerSets extends Component {
	render() {
		return <Table dataSource={this.props.data} rowKey="id" columns={columns}></Table>
	}
}

export default BiomarkerSets