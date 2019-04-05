import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import { Empty, Button, Typography, Skeleton } from 'antd';
import Category from '../../components/tags/Category';
import Biomarkers from '../../components/tables/Biomarkers';

const { Title, Text } = Typography;
const biomoleculeQuery = loader('../../queries/biomolecule.graphql');

class Biomolecule extends Component {
	render() {
		const bioid = this.props.match.params.id;
			
		return(
			<Query query={biomoleculeQuery} variables={{id: bioid}}>
			{({ loading, error, data }) => {
				if (loading) return <Skeleton/>;
				if (error) return <p>Error</p>;
				if (!data.biomolecule){
					return <Empty>
						<Button>{bioid}&nbsp; could not be found...</Button>
					</Empty>;
				}
				return <div>
					<Title>{data.biomolecule.name}</Title>
					<Title level={2}><Text type="secondary">{data.biomolecule.id}</Text></Title>
					<b>Abreviation</b>
				   	<p>{data.biomolecule.shortName}</p>
					<b>Biological category</b>
					<br/>
					<Category name={data.biomolecule.category.id}/>
					<br/>
					<b>Description</b>
					<p>{data.biomolecule.description}</p>
					<b>Biomarkers</b>
					<Biomarkers data={data.biomolecule.biomarkers}/>
				</div>;
			}}
			</Query>
		)
	}
}

export default Biomolecule