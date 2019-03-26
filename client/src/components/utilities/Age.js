import React, {Component} from 'react';
import { Row, Col, Statistic } from 'antd';
import {GeneralColors} from '../../commons/ColorSettings'
import './Age.css';
class Age extends Component {
	render() {

		const ageData = val => val === -1 ? "NA" : val

		const getValueStyle = val => val === -1 || val === "NA" ? {color: GeneralColors.faded} : {}

		const getRange = (min, max) => min === -1 || max === -1 ? "NA" : min+" - "+max

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
						<Statistic title={"Range"}
							valueStyle={getValueStyle(getRange(this.props.min, this.props.max))} 
							value={getRange(this.props.min, this.props.max)}/>
                  	</Col>
                  	<Col span={8}>
						<Statistic title={cutu(this.props.cutoff)}
							valueStyle={getValueStyle(this.props.under)}
							value={ageData(this.props.under)}/>
                    </Col>
                    <Col span={8}>
						<Statistic title={cuto(this.props.cutoff)}
							valueStyle={getValueStyle(this.props.over)} 
							value={ageData(this.props.over)}/>
                    </Col>
                </Row>
                <Row gutter={16}>   
                    <Col span={8}>
						<Statistic title={"Mean"}
							valueStyle={getValueStyle(this.props.avg)}  
							value={ageData(this.props.avg)}/>
                    </Col>
                    <Col span={8}>
						<Statistic title={"SD"}
							valueStyle={getValueStyle(this.props.sd)} 
							value={ageData(this.props.sd)}/>
                    </Col>
                    <Col span={8}>
						<Statistic title={"Median"}
							valueStyle={getValueStyle(this.props.med)} 
							value={ageData(this.props.med)}/>
                    </Col>
                </Row>     
            </div>
        )
    }    
}    
export default Age