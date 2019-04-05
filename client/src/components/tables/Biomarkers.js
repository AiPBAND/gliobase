import React, {Component} from 'react';
import Table from 'antd/lib/table';
import BioID from '../tags/BioID';
import BiomoleculeList from '../lists/BiomoleculeList';

const columns = [{
	title: 'ID',
	dataIndex: 'id',
	key: 'id',
	width: 180,
	render: id => (
		<BioID id={id} name=""/>
	)
},{
	title: 'Biomolecules',
	dataIndex: 'biomolecules',
	key: 'biomolecules',
	render: (biomolecules) => {
		const listIds = biomolecules.map(en => {
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
	return <BiomoleculeList data={record.biomolecules}></BiomoleculeList>
}

class Biomarkers extends Component {
	render() {
		return <Table dataSource={this.props.data} 
			rowKey="id" columns={columns} expandedRowRender={expanded}></Table>
	}
}

export default Biomarkers