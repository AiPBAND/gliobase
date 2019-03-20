import React, {Component} from 'react';
import { Button, Divider } from 'antd';
import './Home.css'
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import Biomarkers from '../components/Biomarkers';
import DataSummary from '../components/DataSummary';
import BiomarkerSets from '../components/BiomarkersSets';
import Evidences from '../components/Evidences';

const biomarkersQuery = loader('../queries/biomarkers.graphql');
const biomarkerSetsQuery = loader('../queries/biomarkerSets.graphql');
const evidencesQuery = loader('../queries/evidences.graphql');
const dataSummaryQuery = loader('../queries/dataSummary.graphql');

function ExampleData(props) {
	switch (props.showData) {
		case 0:
			return (
				<Query query={biomarkersQuery}>
					{({ loading, error, data }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error</p>;
						return <Biomarkers data={data.biomarkers}/>
					}}
				</Query>
			)
		case 1:
			return (
				<Query query={biomarkerSetsQuery}>
					{({ loading, error, data }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error</p>;
						return <BiomarkerSets data={data.biomarkerSets}/>
					}}
				</Query>
			)
		case 2:
			return (
				<Query query={evidencesQuery}>
					{({ loading, error, data }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error</p>;
						return <Evidences data={data.evidences}/>
					}}
				</Query>
			)
		default:
			return (
				<Query query={biomarkersQuery}>
					{({ loading, error, data }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error</p>;
						return <Biomarkers data={data.biomarkers}/>
					}}
				</Query>
			)
	}
}

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  showData: -1,
		};
	}

	showBiomarkers = () => {
    if (this.state.showData === 0){
      this.setState({
        showData: -1,
      });
    }
    else {
      this.setState({
        showData: 0,
      });
    }
	}

	showBiomarkerSets = () => {
    if (this.state.showData === 1){
      this.setState({
        showData: -1,
      });
    }
    else {
      this.setState({
        showData: 1,
      });
    }
	}

	showEvidences = () => {
		if (this.state.showData === 2){
		  this.setState({
			showData: -1,
		  });
		}
		else {
		  this.setState({
			showData: 2,
		  });
		}
	}

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
                  numberOfEvidences = {data.evidences.length}
                  onClickBiomarkers = {this.showBiomarkers}
				  onClickBiomarkerSets = {this.showBiomarkerSets}
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

