import React, {Component} from 'react';
import { Statistic } from 'antd';
import { Row, Col } from 'antd';
import {GeneralColors} from '../../commons/ColorSettings'
class Gender extends Component {
	render() {
        const getValueStyle = val => val === -1 || val === "NA" ? {color: GeneralColors.faded} : {}

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
                  <Statistic title="Male" 
                             valueStyle={getValueStyle(this.props.male)}
                             value={genData(this.props.male) }/>
                </Col>
                <Col span={12}>
                   <Statistic title="Female" 
                              valueStyle={getValueStyle(this.props.female)}
                              value={genData(this.props.female)}/>
                </Col>
            </Row>
        )
    }    
}    
export default Gender