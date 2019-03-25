import React, {Component} from 'react';
import Table from 'antd/lib/table';
import BioID from './tags/BioID';
import Category from './tags/Category';

const columns = [{
	title: 'ID',
	dataIndex: 'id',
	key: 'id',
	render: (id, record) => (
		<BioID id={id} name={record.shortName}/>
	)
  }, {
	title: 'Name',
	dataIndex: 'name',
	key: 'name'
  }, {
	title: 'Category',
	dataIndex: 'category',
	key: 'category.id',
	render: category => (
		<Category name={category.id}/>
	)
  }];
  

class Entities extends Component {
	render() {
		
		
		return <Table dataSource={this.props.data} rowKey="id" columns={columns}></Table>
	}
}

export default Entities