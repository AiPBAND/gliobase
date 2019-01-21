import React, {Component} from 'react';
import { Button, Divider } from 'antd';
import './Home.css'
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import Biomarkers from './Biomarkers';
import DataSummary from './DataSummary';

const biomarkersQuery = loader('../queries/biomarkers.graphql');

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
					<DataSummary
						numberOfBiomarker = {5}
						numberOfBiomarkerSet = {4} 
						numberOfLiterature = {8}
					/>
				</div>
				<Query query={biomarkersQuery}>
					{({ data }) => {
						console.log(data.biomarkers);
						return <Biomarkers data={data.biomarkers}></Biomarkers>
					}}
				</Query>
			</div>
		);
	};
}

export default Home;

