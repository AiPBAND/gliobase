import React, {Component} from 'react';
import { Tabs, Icon, Skeleton, Spin, Row, Col, Card } from 'antd';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import Entities from '../components/tables/Entities';
import Biomarkers from '../components/tables/Biomarkers';
import Evidences from '../components/tables/Evidences';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import {CategoryColors} from '../commons/ColorSettings';
import './Exploration.css'

const entitiesQuery = loader('../queries/entities.graphql');
const biomarkersQuery = loader('../queries/biomarkers.graphql');
const evidencesQuery = loader('../queries/evidencesConcise.graphql');

const TabPane = Tabs.TabPane;

function ShapeDataForCharts(inputData, sortMethod = 0) {
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
  const entries = Object.entries(tally);

  switch (sortMethod) {
    //Do not sort
    case 0:
      return keys.map(el => ({ item: el, count: tally[el]}));
    //Sort by name
    case 1:
      keys.sort();
      return keys.map(el => ({ item: el, count: tally[el]}));
    //Sort by count
    case 2:
      entries.sort((a, b) => {
        if (a[1] > b[1]) {
          return -1;
        }
        if (a[1] < b[1]) {
          return 1;
        }
        return 0;
      })
      return entries.map(el => ({ item: el[0], count: el[1]}));
    default: 
      return keys.map(el => ({ item: el, count: tally[el]}));
  }
  
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
              const entityCategoryChart = ShapeDataForCharts(entityCategory, 1);
              return (
                <div className='exploration-statistics'>
                  <Card>
                    <PieChart data={entityCategoryChart} intervalWidth={2} colorSet={entityColorSet} chartTitle={"Catagory"}/>  
                  </Card>    
                  <Entities data={entityData.entities}/> 
                </div>
              );
            }}
          </Query>	
        </TabPane>

        <TabPane tab={<span><Icon type="tags" />Biomarkers</span>} key="2">
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
        <TabPane tab={<span><Icon type="read" />Evidences</span>} key="3">
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
              const evidenceSourceChart = ShapeDataForCharts(evidenceSource, 0)
              const evidenceRegion = evidenceData.evidences.map(el => el.region).flat();
              const evidenceRegionChart = ShapeDataForCharts(evidenceRegion, 2)
              return (
                <div className='exploration-statistics'>
                  <Row>
                    <Col span={12}>
                      <Card>
                        <BarChart data={evidenceSourceChart} chartTitle={"Source"}/>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card>
                        <PieChart data={evidenceRegionChart} chartTitle={"Region"} intervalWidth={0.5}/>
                      </Card>                 
                    </Col>
                  </Row>
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