import React from 'react';
import { Query } from "react-apollo";
import { loader } from 'graphql.macro';
import Table from 'antd/lib/table';
import {Tag} from 'antd';

const biomarkersQuery = loader('../queries/biomarkers.graphql');
 
const colors = {
	DNA: "green",
	protein: "cyan",
	RNA: "magenta",
	tissue: "blue",
	blood: "purple",
	fluid: "red",
	CSF: "gold"
}

const columns = [{
	title: 'ID',
	dataIndex: 'id',
	key: 'id'
  }, {
	title: 'Name',
	dataIndex: 'name',
	key: 'name'
  }, {
	title: 'Category',
	dataIndex: 'category.id',
	key: 'category.id',
	render: category => (
		<span>
		  	<Tag color={colors[category]} key={category}>{category}</Tag>
		</span>
	)
  }, {
	title: 'Source',
	dataIndex: 'source.id',
	key: 'source.id',
	render: source => (
		<span>
		  	<Tag color={colors[source]} key={source}>{source}</Tag>
		</span>
	)
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