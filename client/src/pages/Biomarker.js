import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import { List, Typography} from 'antd';
import './Evidence.css';
import Evidences from '../components/Evidences';
import BioID from '../components/BioID';

const { Title} = Typography;

const biomarkerQuery = loader('../queries/biomarker.graphql');

class Biomarker extends Component {
	render() {
		const bioid = this.props.match.params.id;
		return(
			<Query query={biomarkerQuery} variables={{id: bioid}}>
			{({ loading, error, data }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error</p>;

				return (<div>

					<Title>
						{data.biomarker.id}
					</Title>
					<List
						header={<div>Entities</div>}
						bordered
						dataSource={data.biomarker.entities}
						renderItem={item => (<List.Item><BioID id={item.id}>{item.id}</BioID>{" - "+item.name}</List.Item>)}
					/>
					<Title level={2}>Evidence</Title>
					
					<Evidences data={data.biomarker.evidences}></Evidences>

				</div>)
			}}
			</Query>
		)
	}
}

export default Biomarker