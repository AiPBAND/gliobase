import React, {Component} from 'react';
import { Tabs, Icon, Row, Col } from 'antd';
import { Pie } from 'ant-design-pro/lib/Charts';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import Biomarkers from '../components/Biomarkers';
import './Exploration.css'

const biomarkersQuery = loader('../queries/biomarkers.graphql');

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
              {/* console.log(tally); */}
              const inputData = Object.entries(tally).map(el => ({ x: el[0], y: el[1]}));
              {/* console.log(inputData); */}
              return (
                <div className='exploration-statistics'>
                  <h4>Catagory of Biomarkers</h4>
                  <Pie
                        className="exploration-pie-chart-biomarker-category"
                        data={inputData}
                        height={150}
                  />
                  <Biomarkers data={biomarkerData.biomarkers}/>

                  
                  {/* <Row>
                    <Col span={6}>
                      <h2>Catagory</h2>
                      <Pie
                        className="exploration-pie-chart-biomarker-category"
                        data={inputData}
                        height={150}
                      />
                    </Col>
                  </Row>  */}

                </div>
              );
            }}
          </Query>	
        </TabPane>
        <TabPane tab={<span><Icon type="folder-open" />Biomarker Sets</span>} key="2">

        </TabPane>
        <TabPane tab={<span><Icon type="book" />Evidences</span>} key="3">

        </TabPane>
      </Tabs>
		);
	};
}

export default Exploration;