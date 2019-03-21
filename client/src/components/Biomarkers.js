import React, {Component} from 'react';
import Table from 'antd/lib/table';
import BioID from './BioID';

const columns = [{
	title: 'ID',
	dataIndex: 'id',
	key: 'id',
	render: id => (
		<BioID id={id}/>
	)
  },{
	title: 'Entities',
	dataIndex: 'entityIds',
	key: 'entityIds',
	render: (ids) => {
		const listIds = ids.map(id => {
		return <BioID id={id}>{id+" "}</BioID>;
		})
		return <span>{listIds}</span>
	}
  }];
  

class Biomarkers extends Component {
	render() {
		console.log(this.props.data)
		return <Table dataSource={this.props.data} rowKey="id" columns={columns}></Table>
	}
}

export default Biomarkers