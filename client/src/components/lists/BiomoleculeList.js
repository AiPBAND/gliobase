import React, {Component} from 'react';
import { List } from 'antd';
import BioID from '../tags/BioID';
import Category from '../tags/Category';
import './BiomoleculeList.css';

class BiomoleculeList extends Component {
	render() {
		return <List
			bordered
			dataSource={this.props.data}
			renderItem={item => (
				<List.Item>
					<BioID id={item.id} name={item.shortName}></BioID>
					{" "+item.name}
					<div className="floatright"><Category name={item.category.id}/></div>
				</List.Item>
			)}
		/>;
	}
}
export default BiomoleculeList