import React, {Component} from 'react';
import { Row, Col, Statistic } from 'antd';
import './Age.css';
class Age extends Component {
	render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title={"Min"} value={this.props.min}/>
                    </Col>
                    <Col span={12}>
                        <Statistic title={"Max"} value={this.props.max}/>
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
                <Row gutter={16}>
                    <Col span={8}>
                        <Statistic title={"Under"} value={this.props.under}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title={"Cut off"} value={this.props.cutoff}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title={"Over"} value={this.props.over}/>
                    </Col>
                </Row>
            </div>
        )
    }    
}    
export default Age