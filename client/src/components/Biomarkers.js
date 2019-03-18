import React, {Component} from 'react';
import { loader } from 'graphql.macro';
import Table from 'antd/lib/table';
import {Tag} from 'antd';

const biomarkersQuery = loader('../queries/biomarkers.graphql');
 
const colors = {
	DNA: "green",
	protein: "cyan",
	RNA: "magenta"
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
  }];
  

class Biomarkers extends Component {
	render() {
		return <Table dataSource={this.props.data} rowKey="id" columns={columns}></Table>
	}
}

export default Biomarkers