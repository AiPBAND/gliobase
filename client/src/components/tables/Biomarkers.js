import React, {Component} from 'react';
import Table from 'antd/lib/table';
import BioID from '../tags/BioID';

const columns = [{
	title: 'ID',
	dataIndex: 'id',
	key: 'id',
	render: id => (
		<BioID id={id} name="Biomarker"/>
	)
  },{
	title: 'Entities',
	dataIndex: 'entities',
	key: 'entities',
	render: (entities) => {
		const listIds = entities.map(en => {
			return <BioID id={en.id} name={en.shortName}></BioID>;
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