import React, {Component} from 'react';
import { loader } from 'graphql.macro';
import Table from 'antd/lib/table';
import { Tag } from 'antd';

const biomarkersQuery = loader('../queries/biomarkerSets.graphql');

const columns = [{
	title: 'ID',
	dataIndex: 'id',
	key: 'id'
  },{
	title: 'Biomarkers',
	dataIndex: 'biomarkerIds',
	key: 'biomarkerIds',
	render: (ids) => {
		const listIds = ids.map(id => {
			return <Tag>{id+" "}</Tag>;
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