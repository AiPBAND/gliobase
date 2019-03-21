import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import { List, Typography} from 'antd';
import './Evidence.css';
import Evidences from '../components/Evidences';
import BioID from './../components/BioID';

const { Title, Text } = Typography;

const biomarkerSetQuery = loader('../queries/biomarkerSet.graphql');

class BiomarkerSet extends Component {
	render() {
		const bioid = this.props.match.params.id;
		return(
			<Query query={biomarkerSetQuery} variables={{id: bioid}}>
			{({ loading, error, data }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error</p>;

				
					
				return (<div>

					<Title>
						{data.biomarkerSet.id}
					</Title>
					<List
						header={<div>Biomarkers</div>}
						bordered
						dataSource={data.biomarkerSet.biomarkers}
						renderItem={item => (<List.Item><BioID id={item.id}>{item.id}</BioID>{" - "+item.name}</List.Item>)}
					/>
					<Title level={2}>Evidence</Title>
					
					<Evidences data={data.biomarkerSet.evidences}></Evidences>

				</div>)
			}}
			</Query>
		)
	}
}

export default BiomarkerSet