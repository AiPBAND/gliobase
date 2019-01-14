import React from 'react';
import { Query } from "react-apollo";
import { loader } from 'graphql.macro';
import Table from 'antd/lib/table';

const biomarkersQuery = loader('../queries/biomarkers.graphql');

const columns = [{
	title: 'ID',
	dataIndex: 'id',
	key: 'id',
  }, {
	title: 'Name',
	dataIndex: 'name',
	key: 'name',
  }, {
	title: 'Category',
	dataIndex: 'category.name',
	key: 'category.name',
  }];
  

const Biomarkers = () => (
	<Query query={biomarkersQuery}>
		{({ loading, error, data }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error :(</p>;

			console.log(data.biomarkers)

			return <Table dataSource={data.biomarkers} rowKey="id" columns={columns}></Table>

		}}
  	</Query>
);

export default Biomarkers