import React, {Component} from 'react';
import { Row, Col, Statistic } from 'antd';
import './Age.css';
class Age extends Component {
	render() {
        function range(min, max){
            return (min+" "+"-"+" "+max)
        }
        function cutu(cut){
            return ("<"+cut)
        }
        function cuto(cut){
            return (">"+cut)
        }
        return (
            <div>
                <Row gutter={16}>
                  <Col span={8}>
                     <Statistic title={"Range"} value={range(this.props.min, this.props.max)}/>
                  </Col>
                  <Col span={8}>
                        <Statistic title={cutu(this.props.cutoff)} value={this.props.under}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title={cuto(this.props.cutoff)} value={this.props.over}/>
                    </Col>
                </Row>
                <Row gutter={16}>   
                    <Col span={8}>
                        <Statistic title={"Mean"} value={this.props.avg}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title={"SD"} value={this.props.sd}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title={"Median"} value={this.props.med}/>
                    </Col>
                </Row>     
            </div>
        )
    }    
}    
export default Age