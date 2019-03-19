import React, {Component} from 'react';
import { Tabs, Icon } from 'antd';
import { Pie } from 'ant-design-pro/lib/Charts';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';

const biomarkersQuery = loader('../queries/biomarkers.graphql');

const TabPane = Tabs.TabPane;

class Exploration extends Component {
	render(){
    // const categories = [
    //   {
    //     x: 'RNA',
    //     y: 4544,
    //   },
    //   {
    //     x: 'Aminopeptidase',
    //     y: 3321,
    //   },
    // ];

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
                <Pie
                  className="exploration-pie-chart-biomarker-category"
                  data={inputData}
                  height={150}
                />
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