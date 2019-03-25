import React, {Component} from 'react';
import { Statistic } from 'antd';
import { Row, Col } from 'antd';
class Gender extends Component {
	render() {
        function genData(gen){
            if (gen !== -1){
              return (gen)
            }
            else {
                return("NA")
            }
        }
        return (
           <Row gutter={16}>
                <Col span={12}>
		          <Statistic title="Male" value={genData(this.props.male)}/>
                </Col>
                <Col span={12}>
		           <Statistic title="Female" value={genData(this.props.female)}/>
                </Col>
            </Row>
        )
    }    
}    
export default Gender