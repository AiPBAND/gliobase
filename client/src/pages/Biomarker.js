import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import { Empty } from 'antd';
import { Button } from 'antd';
import { Card } from 'antd';
import { Tag } from 'antd';
const biomarkerQuery = loader('../queries/biomarker.graphql');

class Biomarker extends Component {
	render() {
		const bioid = this.props.match.params.id;
			
		return(
			<Query query={biomarkerQuery} variables={{poop: bioid}}>
			{({ loading, error, data }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error</p>;
				if (!data.biomarker){
					return <p>
					<Empty>
						<Button>{bioid}&nbsp;doesn't exist </Button>
					</Empty>
				</p>;
				}
				const listAbs = data.biomarker.abreviations.map(abreviations => {
					return <Tag>{abreviations+" "}</Tag>;
				})
				return (
				<Card title={bioid+"-"+data.biomarker.name}>
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
					 {data.biomarker.category.id}
					</Card>
					 <Card
					   style={{ marginTop: 16}}
					   type="inner"
					   title="Description"
					   >
					   {data.biomarker.description}
					</Card>
				</Card>	
				);
			}}
			</Query>
		)
	}
}

export default Biomarker