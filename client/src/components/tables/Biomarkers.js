import React, {Component} from 'react';
import Table from 'antd/lib/table';
import BioID from '../tags/BioID';
import EntityList from '../lists/EntityList';

const columns = [{
	title: 'ID',
	dataIndex: 'id',
	key: 'id',
	width: 180,
	render: id => (
		<BioID id={id} name="Biomarker"/>
	)
},{
	title: 'Entities',
	dataIndex: 'entities',
	key: 'entities',
	render: (entities) => {
		const listIds = entities.map(en => {
			return <BioID id={en.id} name={en.shortName} key={en.id}></BioID>;
		})
		if(listIds.length > 15) {
			listIds.length = 15
			listIds.push(<span>...</span>)
		}
		return <span>{listIds}</span>
	}
},{
	title: 'Related evidences',
	dataIndex: 'evidenceCount',
	key: 'evidenceCount',
	align: 'center',
	width: 150
}];
  
const expanded = (record) => {
	return <EntityList data={record.entities}></EntityList>
}

class Biomarkers extends Component {
	render() {
		return <Table dataSource={this.props.data} 
			rowKey="id" columns={columns} expandedRowRender={expanded}></Table>
	}
}

export default Biomarkers