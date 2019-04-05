import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import { Typography, Skeleton} from 'antd';
import './Evidence.css';
import Evidences from '../../components/tables/Evidences';
import BiomoleculeList from '../../components/lists/BiomoleculeList';

const { Title} = Typography;

const biomarkerQuery = loader('../../queries/biomarker.graphql');

class Biomarker extends Component {
	render() {
		const bioid = this.props.match.params.id;
		return(
			<Query query={biomarkerQuery} variables={{id: bioid}}>
			{({ loading, error, data }) => {
				if (loading) return <Skeleton/>;
				if (error) return <p>Error</p>;

				console.log(data.biomarker)

				return <div>

					<Title>{data.biomarker.id}</Title>
					<BiomoleculeList data={data.biomarker.biomolecules}/>

					<Title level={2}>Evidence</Title>
					
					<Evidences data={data.biomarker.evidences}></Evidences>

				</div>
			}}
			</Query>
		)
	}
}

export default Biomarker