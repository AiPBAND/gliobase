import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import { Empty, Button, Card, Tag } from 'antd';

const entityQuery = loader('../queries/entity.graphql');

class Entity extends Component {
	render() {
		const bioid = this.props.match.params.id;
			
		return(
			<Query query={entityQuery} variables={{id: bioid}}>
			{({ loading, error, data }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error</p>;
				if (!data.entity){
					return <p>
					<Empty>
						<Button>{bioid}&nbsp;doesn't exist </Button>
					</Empty>
				</p>;
				}
				const listAbs = data.entity.abreviations.map(abreviations => {
					return <Tag>{abreviations+" "}</Tag>;
				})
				return (
				<Card title={bioid+"-"+data.entity.name}>
				 <p
				   style={{
					   fontsize: 14,
					   color: 'rgba(0.3,0,0, 0.85)',
					   marginBottom: 16,
					   fontWeight: 500,
				   }}
				   >
				   <span>{listAbs}</span>
				   </p>
				   <Card
					 type="inner"
					 title="Category"
					 >
					 {data.entity.category.id}
					</Card>
					 <Card
					   style={{ marginTop: 16}}
					   type="inner"
					   title="Description"
					   >
					   {data.entity.description}
					</Card>
				</Card>	
				);
			}}
			</Query>
		)
	}
}

export default Entity