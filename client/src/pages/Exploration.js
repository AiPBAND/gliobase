import React, {Component} from 'react';
import { Tabs, Icon } from 'antd';
import { Pie } from 'ant-design-pro/lib/Charts';

const TabPane = Tabs.TabPane;

class Exploration extends Component {
	render(){
		return (
      <Tabs type="card">
        <TabPane tab={<span><Icon type="experiment" />Biomarkers</span>} key="1">
          <Pie percent={28} height={200} />
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