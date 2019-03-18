import React, {Component} from 'react';
import { Tabs, Icon } from 'antd';
import { Pie, yuan } from 'ant-design-pro/lib/Charts';

const TabPane = Tabs.TabPane;

class Exploration extends Component {
	render(){
    const salesPieData = [
      {
        x: '家用电器',
        y: 4544,
      },
      {
        x: '食用酒水',
        y: 3321,
      },
      {
        x: '个护健康',
        y: 3113,
      },
      {
        x: '服饰箱包',
        y: 2341,
      },
      {
        x: '母婴产品',
        y: 1231,
      },
      {
        x: '其他',
        y: 1231,
      },
    ];

		return (
      <Tabs type="card">
        <TabPane tab={<span><Icon type="experiment" />Biomarkers</span>} key="1">
          <Pie
            className="exploration-pie-chart-biomarker-category"
            data={salesPieData}
            height={150}
          />
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