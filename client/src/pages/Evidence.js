import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import { Card, Tag, Alert, List, Row, Col, Typography, Statistic} from 'antd';
import './Evidence.css';
import BioID from './../components/BioID';

const { Title, Text } = Typography;

const evidenceQuery = loader('../queries/evidence.graphql');

class Evidence extends Component {
	render() {
		const bioid = this.props.match.params.id;
		return(
			<Query query={evidenceQuery} variables={{id: bioid}}>
			{({ loading, error, data }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error</p>;

				const listIds = data.evidence.biomarker.entityIds.map(id => {
					return <BioID id={id}>{id+" "}</BioID>;
				})

				const sourceIds = data.evidence.sourceIds.map(id => {
					return <Tag>{id+" "}</Tag>;
				})

				const species = data.evidence.species.map(id => {
					return <Tag>{id+" "}</Tag>;
				})

				const stage = data.evidence.stage.map(id => {
					return <Tag>{id+" "}</Tag>;
				})
				
				//TODO: Clean this mess

				const validatedMessage = () =>{
					if(data.evidence.application.validated === "Yes") return "Validated"
					if(data.evidence.application.validated === "No") return "Not validated"
					if(data.evidence.application.validated === "Potential") return "Potential"
					return "This information is unavailable";
				}

				const validatedType = () =>{
					if(data.evidence.application.validated === "Yes") return "success"
					if(data.evidence.application.validated === "No") return "error"
					if(data.evidence.application.validated === "Potential") return "info"
					return "warning";
				}

				const diagnosisMessage = () =>{
					if(data.evidence.application.diagnosis === "YES") return "Yes"
					if(data.evidence.application.diagnosis === "NO") return "No"
					if(data.evidence.application.diagnosis === "Potential") return "Potential"
					return "This information is unavailable";
				}

				const diagnosisType = () =>{
					if(data.evidence.application.diagnosis === "YES") return "success"
					if(data.evidence.application.diagnosis === "NO") return "error"
					if(data.evidence.application.diagnosis === "Potential") return "info"
					return "warning";
				}

				const prognosisMessage = () =>{
					if(data.evidence.application.prognosis === "YES") return "Yes"
					if(data.evidence.application.prognosis === "NO") return "No"
					if(data.evidence.application.prognosis === "Potential") return "Potential"
					return "This information is unavailable";
				}

				const prognosisType = () =>{
					if(data.evidence.application.prognosis === "YES") return "success"
					if(data.evidence.application.prognosis === "NO") return "error"
					if(data.evidence.application.prognosis === "Potential") return "info"
					return "warning";
				}

				const predictiveMessage = () =>{
					if(data.evidence.application.predictive === "YES") return "Yes"
					if(data.evidence.application.predictive === "NO") return "No"
					if(data.evidence.application.predictive === "Potential") return "Potential"
					return "This information is unavailable";
				}

				const predictiveType = () =>{
					if(data.evidence.application.predictive === "YES") return "success"
					if(data.evidence.application.predictive === "NO") return "error"
					if(data.evidence.application.predictive === "Potential") return "info"
					return "warning";
				}

				const therapeuticMessage = () =>{
					if(data.evidence.application.therapeutic === "YES") return "Yes"
					if(data.evidence.application.therapeutic === "NO") return "No"
					if(data.evidence.application.therapeutic === "Potential") return "Potential"
					return "This information is unavailable";
				}

				const therapeuticType = () =>{
					if(data.evidence.application.therapeutic === "YES") return "success"
					if(data.evidence.application.therapeutic === "NO") return "error"
					if(data.evidence.application.therapeutic === "Potential") return "info"
					return "warning";
				}

				const showZero = (value) => {
					if(value === -1) return 0;
					else return value;
				}
					
				return (<div>

					<Title>
						{data.evidence.id}
						<Title level={2}>
							<Text type="secondary">PubMed ID: {data.evidence.pmid}</Text>
						</Title>
					</Title>
					<span>{listIds}</span>

					<Row gutter={15}>
						<Col span={12}>
							<Card title="Samples" size="small">
								<b>Sources</b>
								<div>{sourceIds}</div>
								<b>Species</b>
								<div>{species}</div>
								<b>Gender</b>
								<Row gutter={16}>
									<Col span={12}>
										<Statistic title="Male" value={showZero(data.evidence.gender.male)}/>
									</Col>
									<Col span={12}>
										<Statistic title="Female" value={showZero(data.evidence.gender.female)}/>
									</Col>
								</Row>
							</Card>
						</Col>
						<Col span={12}>
							<Card title="Classification" size="small">
								<b>WHO Classification</b>
								<p>{data.evidence.whoclass}</p>
								<b>Stage</b>
								<p>{stage}</p>
							</Card>
						</Col>
					</Row>

					<Card title="Research" size="small">
						<b>Methods</b>
						<List
							bordered
							dataSource={data.evidence.research.methods}
							renderItem={item => (<List.Item>{item}</List.Item>)}
						/>
						<b>Results</b>
						<List
							bordered
							dataSource={data.evidence.research.results}
							renderItem={item => (<List.Item>{item}</List.Item>)}
						/>
						<b>Conclusions</b>
						<List
							bordered
							dataSource={data.evidence.research.conclusions}
							renderItem={item => (<List.Item>{item}</List.Item>)}
						/>
					</Card>

					<Card title="Clinical" size="small">
						<b>Relevance</b>
						<p>{data.evidence.clinical.relevance}</p>
						<b>Implication</b>
						<p>{data.evidence.clinical.implication}</p>
						<b>Treatment</b>
						<p>{data.evidence.clinical.treatment}</p>
					</Card>

					<Card title="Application" size="small">
						<b>Validation</b>
						<Alert
							message={validatedMessage()}
							type={validatedType()}
							showIcon
						/>
						<b>Diagnostic application</b>
						<Alert
							message={diagnosisMessage()}
							type={diagnosisType()}
							showIcon
						/>
						<b>Prognostic application</b>
						<Alert
							message={prognosisMessage()}
							type={prognosisType()}
							showIcon
						/>
						<b>Predictive application</b>
						<Alert
							message={predictiveMessage()}
							type={predictiveType()}
							showIcon
						/>
						<b>Therapeutic application</b>
						<Alert
							message={therapeuticMessage()}
							type={therapeuticType()}
							showIcon
						/>
					</Card>
				</div>)
			}}
			</Query>
		)
	}
}

export default Evidence