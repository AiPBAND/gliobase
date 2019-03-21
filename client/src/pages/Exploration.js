import React, {Component} from 'react';
import { Tabs, Icon } from 'antd';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import Biomarkers from '../components/Biomarkers';
import BiomarkerSets from '../components/BiomarkersSets';
import Evidences from '../components/Evidences';
import PieChart from '../components/PieChart';
import './Exploration.css'

const biomarkersQuery = loader('../queries/biomarkers.graphql');
const biomarkerSetsQuery = loader('../queries/biomarkerSets.graphql');
const evidencesQuery = loader('../queries/evidencesConcise.graphql');

const TabPane = Tabs.TabPane;

class Exploration extends Component {
	render(){
		return (
      <Tabs type="card">
        <TabPane tab={<span><Icon type="experiment" />Biomarkers</span>} key="1">
          <Query query={biomarkersQuery}>
            {({ loading, error, data: biomarkerData }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;
              const biomarkerCategory = biomarkerData.biomarkers.map(el => el.category.id);
              const tally = biomarkerCategory.reduce((accumulator, el) => {
                if (accumulator[el] === undefined) {
                  accumulator[el] = 1;
                } else {
                  accumulator[el]++;
                }
                return accumulator;
              }, {});
              const inputDataCatagory = Object.entries(tally).map(el => ({ item: el[0], count: el[1]}));
              return (
                <div className='exploration-statistics'>
                  <h3>Catagory</h3>
                  <PieChart data={inputDataCatagory} intervalWidth={1}/>
                  <Biomarkers data={biomarkerData.biomarkers}/>
                </div>
              );
            }}
          </Query>	
        </TabPane>
        <TabPane tab={<span><Icon type="folder-open" />Biomarker Sets</span>} key="2">
          <Query query={biomarkerSetsQuery}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;
              return <BiomarkerSets data={data.biomarkerSets}/>
            }}
          </Query>
        </TabPane>
        <TabPane tab={<span><Icon type="book" />Evidences</span>} key="3">
          <Query query={evidencesQuery}>
            {({ loading, error, data: evidenceData }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error</p>;

              const evidenceSource = evidenceData.evidences.map(el => el.sourceIds);
              const tally = evidenceSource.reduce((accumulator, el) => {
                if (accumulator[el] === undefined) {
                  accumulator[el] = 1;
                } else {
                  accumulator[el]++;
                }
                return accumulator;
              }, {});
              const inputDataSource = Object.entries(tally).map(el => ({ item: el[0], count: el[1]}));

              return (
                <div className='exploration-statistics'>
                  <h3>Source</h3>
                  <PieChart data={inputDataSource} intervalWidth={0.5}/>
                  <Evidences data={evidenceData.evidences}/>
                </div>
              );
            }}
          </Query>
        </TabPane>
      </Tabs>
		);
	};
}

export default Exploration;