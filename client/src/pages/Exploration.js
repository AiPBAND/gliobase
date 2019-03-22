import React, {Component} from 'react';
import { Tabs, Icon, Skeleton, Spin } from 'antd';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import Entities from '../components/Entities';
import Biomarkers from '../components/Biomarkers';
import Evidences from '../components/Evidences';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import {CategoryColors} from '../commons/ColorSettings';
import './Exploration.css'

const entitiesQuery = loader('../queries/entities.graphql');
const biomarkersQuery = loader('../queries/biomarkers.graphql');
const evidencesQuery = loader('../queries/evidencesConcise.graphql');

const TabPane = Tabs.TabPane;

function ShapeDataForCharts(inputData, sortKeys = false) {
  const tally = inputData.reduce((accumulator, el) => {
    if (el === null) {
      ;
    } else if (accumulator[el] === undefined) {
      accumulator[el] = 1;
    } else {
      accumulator[el]++;
    }
    return accumulator;
  }, {});
  const keys = Object.keys(tally);
  if (sortKeys) {
    keys.sort();
  }
  const outputData = keys.map(el => ({ item: el, count: tally[el]}));
  return outputData
}

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
              const entityCategoryChart = ShapeDataForCharts(entityCategory, true);
              return (
                <div className='exploration-statistics'>
                  <PieChart data={entityCategoryChart} intervalWidth={2} colorSet={entityColorSet} chartTitle={"Catagory"}/>
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
              const evidenceSource = evidenceData.evidences.map(el => el.sourceIds).flat();
              const evidenceSourceChart = ShapeDataForCharts(evidenceSource, false)

              //Get statistics of region
              const evidenceRegion = evidenceData.evidences.map(el => el.region).flat();
              const regionTally = evidenceRegion.reduce((accumulator, el) => {
                if (el === null) {
                  ;
                } else if (accumulator[el] === undefined) {
                  accumulator[el] = 1;
                } else {
                  accumulator[el]++;
                }
                return accumulator;
              }, {});
              const regionKeys = Object.keys(regionTally);
              regionKeys.sort();
              const inputEvidenceRegion = regionKeys.map(el => ({ item: el, count: regionTally[el]}));

              return (
                <div className='exploration-statistics'>
                  <BarChart data={evidenceSourceChart} chartTitle={"Source"}/>
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