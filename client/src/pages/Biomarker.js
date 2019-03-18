import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
const biomarkerQuery = loader('../queries/biomarker.graphql');

class Biomarker extends Component {
	render() {
		const bioid = this.props.match.params.id;
		return(
			<Query query={biomarkerQuery} variables={{poop: bioid}}>
			{({ loading, error, data }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error</p>;
				return (<div>{data.biomarker.name}<b>{data.biomarker.id}</b></div>)
			}}
			</Query>
		)
	}
}

export default Biomarker