import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import { Empty, Button, Typography, Tag, Skeleton } from 'antd';
import Category from '../../components/tags/Category';

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
				const listAbs = data.entity.abreviations.map(abreviations => {
					return <Tag>{abreviations+" "}</Tag>;
				})
				return <div>
					<Title>
						{data.entity.name}
						<Title level={2}>
							<Text type="secondary">{data.entity.id}</Text>
						</Title>
					</Title>
					<b>Abreviations</b>
				   	<p>{listAbs}</p>
					<b>Biological category</b>
					<p><Category name={data.entity.category.id}/></p>
					<b>Description</b>
					<p>{data.entity.description}</p>
				</div>;
			}}
			</Query>
		)
	}
}

export default Entity