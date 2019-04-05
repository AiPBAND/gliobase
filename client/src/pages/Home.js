import React, {Component} from 'react';
import { Button, Divider, Skeleton } from 'antd';
import './Home.css'
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import Biomolecules from '../components/tables/Biomolecules';
import DataSummary from '../components/DataSummary';
import Biomarkers from '../components/tables/Biomarkers';
import Evidences from '../components/tables/Evidences';

const biomoleculesQuery = loader('../queries/biomolecules.graphql');
const biomarkersQuery = loader('../queries/biomarkers.graphql');
const evidencesQuery = loader('../queries/evidences.graphql');
const dataSummaryQuery = loader('../queries/dataSummary.graphql');

function ExampleData(props) {
	const biomolecules = <Query query={biomoleculesQuery}>
		{({ loading, error, data }) => {
			if (loading) return <Skeleton active />;
			if (error) return <p>Error</p>;
			return <Biomolecules data={data.biomolecules}/>
		}}
	</Query>

	const biomarkers = <Query query={biomarkersQuery}>
		{({ loading, error, data }) => {
			if (loading) return <Skeleton active />;
			if (error) return <p>Error</p>;
			return <Biomarkers data={data.biomarkers}/>
		}}
	</Query>

	const evidences = <Query query={evidencesQuery}>
		{({ loading, error, data }) => {
			if (loading) return <Skeleton active />;
			if (error) return <p>Error</p>;
			return <Evidences data={data.evidences}/>
		}}
	</Query>

	switch (props.showData) {
		case 0:
			return biomolecules;
		case 1:
			return biomarkers;
		case 2:
			return evidences;
		default:
			return biomolecules;
	}
}

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  showData: 0,
		};
	}

	showBiomolecules = () => {
    this.setState({
      showData: 0,
    });
	}

	showBiomarkers = () => {
    this.setState({
      showData: 1,
    });
	}

	showEvidences = () => {
    this.setState({
    showData: 2,
    });
	}

	render(){
		return (
			<div className = "content">
				<div className = "banner">
					<h1>Gliobase</h1>
					<p>Glioblastoma multiforme (GBM) biomarker knowledge base</p>
					<Button icon="github" size="small" href="https://github.com/thehyve/gliobase">Github</Button>
				</div>
				<Divider dashed />
				<div className = "data-summary">
					<Query query={dataSummaryQuery}>
						{({ loading, error, data }) => {
							if (loading) return <Skeleton active />;
							if (error) return <p>Error</p>;
							return (
								<DataSummary
									numberOfBiomolecule = {data.biomolecules.length}
									numberOfBiomarker = {data.biomarkers.length} 
									numberOfEvidences = {data.evidences.length}
									onClickBiomolecules = {this.showBiomolecules}
									onClickBiomarkers = {this.showBiomarkers}
									onClickEvidences = {this.showEvidences}
								/>
							);
						}}
					</Query>	
				</div>
				<ExampleData showData = {this.state.showData} />
			</div>
		);
	};
}

export default Home;

