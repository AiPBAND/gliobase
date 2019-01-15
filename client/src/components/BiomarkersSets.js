import React from 'react';
import { Query } from "react-apollo";
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
  

const BiomarkerSets = () => (
	<Query query={biomarkersQuery}>
		{({ loading, error, data }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error :(</p>;

			return <Table dataSource={data.biomarkerSets} rowKey="id" columns={columns}></Table>
		}}
  	</Query>
);

export default BiomarkerSets