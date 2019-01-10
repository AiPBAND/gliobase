import React from 'react';
import { Query } from "react-apollo";
import { loader } from 'graphql.macro';
const biomarkersQuery = loader('../queries/biomarkers.gql');

const Biomarkers = () => (
	<Query query={biomarkersQuery}>
		{({ loading, error, data }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error :(</p>;

			return data.biomarkers.map(({ name }) => (
				<div key={name}>
					<p>{name}</p>
				</div>
			));
		}}
  	</Query>
);

export default Biomarkers