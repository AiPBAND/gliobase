import React, {Component} from 'react';
import Table from 'antd/lib/table';
import {Tag} from 'antd';
 
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
	dataIndex: 'category',
	key: 'category.id',
	render: category => (
		<span>
		  	<Tag color={colors[category.id]} key={category.id}> <a href = {category.reflink}>{category.id}</a></Tag>
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