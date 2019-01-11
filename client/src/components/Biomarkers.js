import React from 'react';
import { Query } from "react-apollo";
import { loader } from 'graphql.macro';
const biomarkersQuery = loader('../queries/biomarkers.graphql');

const Biomarkers = () => (
	<Query query={biomarkersQuery}>
		{({ loading, error, data }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error :(</p>;

			return data.biomarkers.map(({ name, description, category}) => (
				<div key={name}>
					<p><b>{name}</b>{category.name}</p>
					<p>{description}</p>
				</div>
			));
		}}
  	</Query>
);

export default Biomarkers