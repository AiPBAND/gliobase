import React, {Component} from 'react';
import { Row, Col, Statistic } from 'antd';
import './Age.css';
class Age extends Component {
	render() {
        function ageData(gen){
            if (gen !== -1){
              return (gen)
            }
            else {
                return("NA")
            }
        }
        function range(min, max){
            return (min+" - "+max)
        }
        function cutu(cut){
            if (cut === -1){
                return("<")
            }
            else {
                return ("<"+ageData(cut))
            }
        }
        function cuto(cut){
            if (cut === -1){
                return(">")
            }
            else {
                return (">"+ageData(cut))
            }
        }
        return (
            <div>
                <Row gutter={16}>
                  <Col span={8}>
                     <Statistic title={"Range"} value={ageData(range(this.props.min, this.props.max))}/>
                  </Col>
                  <Col span={8}>
                        <Statistic title={cutu(this.props.cutoff)} value={ageData(this.props.under)}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title={cuto(this.props.cutoff)} value={ageData(this.props.over)}/>
                    </Col>
                </Row>
                <Row gutter={16}>   
                    <Col span={8}>
                        <Statistic title={"Mean"} value={ageData(this.props.avg)}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title={"SD"} value={ageData(this.props.sd)}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title={"Median"} value={ageData(this.props.med)}/>
                    </Col>
                </Row>     
            </div>
        )
    }    
}    
export default Age