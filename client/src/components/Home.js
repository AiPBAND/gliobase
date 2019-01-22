import React, {Component} from 'react';
import { Button, Divider } from 'antd';
import './Home.css'
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import Biomarkers from './Biomarkers';
import DataSummary from './DataSummary';

const biomarkersQuery = loader('../queries/biomarkers.graphql');
const dataSummaryQuery = loader('../queries/dataSummary.graphql');

class Home extends Component {
	render(){
		return (
			<div className = "content">
				<div className = "banner">
					<h1>Gliobase</h1>
					<p>A glioblastoma multiforme (GBM) biomarker knowledge base</p>
					<Button icon="github" size="small" href="https://github.com/thehyve/gliobase">Github</Button>
				</div>
				<Divider dashed />
				<div className = "data-summary">
					<Query query={dataSummaryQuery}>
						{({ loading, error, data }) => {
							if (loading) return <p>Loading...</p>;
							if (error) return <p>Error</p>;
							return (
								<DataSummary
									numberOfBiomarker = {data.biomarkers.length}
									numberOfBiomarkerSet = {data.biomarkerSets.length} 
									numberOfLiterature = {'?'}
								/>
							);
						}}
					</Query>	
				</div>
				<Query query={biomarkersQuery}>
					{({ loading, error, data }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error</p>;
						return <Biomarkers data={data.biomarkers}/>
					}}
				</Query>
			</div>
		);
	};
}

export default Home;

