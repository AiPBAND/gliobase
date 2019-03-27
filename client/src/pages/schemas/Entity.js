import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import { Empty, Button, Typography, Skeleton } from 'antd';
import Category from '../../components/tags/Category';
import Biomarkers from '../../components/tables/Biomarkers';

const { Title, Text } = Typography;
const entityQuery = loader('../../queries/entity.graphql');

class Entity extends Component {
	render() {
		const bioid = this.props.match.params.id;
			
		return(
			<Query query={entityQuery} variables={{id: bioid}}>
			{({ loading, error, data }) => {
				if (loading) return <Skeleton/>;
				if (error) return <p>Error</p>;
				if (!data.entity){
					return <Empty>
						<Button>{bioid}&nbsp; could not be found...</Button>
					</Empty>;
				}
				return <div>
					<Title>{data.entity.name}</Title>
					<Title level={2}><Text type="secondary">{data.entity.id}</Text></Title>
					<b>Abreviation</b>
				   	<p>{data.entity.shortName}</p>
					<b>Biological category</b>
					<br/>
					<Category name={data.entity.category.id}/>
					<br/>
					<b>Description</b>
					<p>{data.entity.description}</p>
					<b>Biomarkers</b>
					<Biomarkers data={data.entity.biomarkers}/>
				</div>;
			}}
			</Query>
		)
	}
}

export default Entity