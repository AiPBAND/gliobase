import React, {Component} from 'react';
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
	dataIndex: 'category',
	key: 'category.id',
	render: category => (
		<span>
		  	<Tag color={colors[category.id]} key={category.id}> <a href = {category.reflink}>{category.id}</a></Tag>
		</span>
	)
  }, {
	title: 'Source',
	dataIndex: 'source',
	key: 'source.id',
	render: source => (
		<span>
		  	<Tag color={colors[source.id]} key={source.id}> <a href = {source.reflink}>{source.id}</a></Tag>
		</span>
	)
  }];
  

class Biomarkers extends Component {
	render() {
		console.log(this.props.data)
		return <Table dataSource={this.props.data} rowKey="id" columns={columns}></Table>
	}
}

export default Biomarkers