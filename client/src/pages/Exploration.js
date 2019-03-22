import React, {Component} from 'react';
import { Tabs, Icon, Skeleton, Spin } from 'antd';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import Entities from '../components/Entities';
import Biomarkers from '../components/Biomarkers';
import Evidences from '../components/Evidences';
import PieChart from '../components/PieChart';
import {CategoryColors} from '../commons/ColorSettings';
import './Exploration.css'

const entitiesQuery = loader('../queries/entities.graphql');
const biomarkersQuery = loader('../queries/biomarkers.graphql');
const evidencesQuery = loader('../queries/evidencesConcise.graphql');

const TabPane = Tabs.TabPane;

class Exploration extends Component {
	render(){
    const entityColorSet = ['item', [CategoryColors['DNA'], CategoryColors['Others'], CategoryColors['Protein'], CategoryColors['RNA']]];
		return (
      <Tabs type="card">
        <TabPane tab={<span><Icon type="experiment" />Entities</span>} key="1">
          <Query query={entitiesQuery}>
            {({ loading, error, data: entityData }) => {
              if (loading) return (
                <div className='exploration-loading'>
                  <Spin size="large" />
                  <Skeleton active paragraph={{ rows: 4 }} />
                </div>
              );
              if (error) return <p>Error</p>;
              const entityCategory = entityData.entities.map(el => el.category.id);
              const tally = entityCategory.reduce((accumulator, el) => {
                if (accumulator[el] === undefined) {
                  accumulator[el] = 1;
                } else {
                  accumulator[el]++;
                }
                return accumulator;
              }, {});
              const keys = Object.keys(tally);
              keys.sort();
              const inputDataCatagory = keys.map(el => ({ item: el, count: tally[el]}));
              return (
                <div className='exploration-statistics'>
                  <h3>Catagory</h3>
                  <PieChart data={inputDataCatagory} intervalWidth={2} colorSet= {entityColorSet}/>
                  <Entities data={entityData.entities}/>
                </div>
              );
            }}
          </Query>	
        </TabPane>

        <TabPane tab={<span><Icon type="folder-open" />Biomarkers</span>} key="2">
          <Query query={biomarkersQuery}>
            {({ loading, error, data }) => {
              if (loading) return (
                <div className='exploration-loading'>
                  <Spin size="large" />
                  <Skeleton active paragraph={{ rows: 4 }} />
                </div>
              );
              if (error) return <p>Error</p>;
              return <Biomarkers data={data.biomarkers}/>
            }}
          </Query>
        </TabPane>
        <TabPane tab={<span><Icon type="book" />Evidences</span>} key="3">
          <Query query={evidencesQuery}>
            {({ loading, error, data: evidenceData }) => {
              if (loading) return (
                <div className='exploration-loading'>
                  <Spin size="large" />
                  <Skeleton active paragraph={{ rows: 4 }} />
                </div>
              );
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