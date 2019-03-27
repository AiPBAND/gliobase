import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import { Card, Alert, List, Row, Col, Typography, Divider} from 'antd';
import './Evidence.css';
import Source from '../../components/tags/Source';
import Gender from '../../components/utilities/Gender'
import Age from '../../components/utilities/Age'
import Species from '../../components/tags/Species';
import Stage from '../../components/tags/Stage';
import EntityList from '../../components/lists/EntityList';
import Region from '../../components/utilities/Region';
import Marker from '../../components/utilities/Marker';
const { Title, Text } = Typography;

const evidenceQuery = loader('../../queries/evidence.graphql');

class Evidence extends Component {
	render() {
		const bioid = this.props.match.params.id;
		return(
			<Query query={evidenceQuery} variables={{id: bioid}}>
			{({ loading, error, data }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error</p>;

        		//Watch out null value!
				const sources = data.evidence.sourceIds ? data.evidence.sourceIds.map(id => {
					return <Source name={id}/>;
				}) : 'N/A';

				const species = data.evidence.species ? data.evidence.species.map(id => {
					return <Species name={id}/>
				}) : 'N/A';

				const stage = data.evidence.stage ?  data.evidence.stage.map(id => {
					return <Stage name={id}/>
				}) : 'N/A';
				
				//TODO: Clean this mess

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
				
				console.log(data.evidence)	
				return (<div>

					<Title>
						{data.evidence.id}
		                <Marker val={data.evidence.application.validated}></Marker> 
						<Title level={2}>
							<Text type="secondary">PubMed ID: {data.evidence.pmid}</Text>
						</Title>
					</Title>
					<EntityList data={data.evidence.biomarker.entities}></EntityList>

					<Row gutter={15}>
						<Col span={12}>
							<Card title="Samples" size="small">
								<Row gutter={15}>
									<Col span={12}>
										<b>Sources</b>
										<div>{sources}</div>
									</Col>
									<Col span={12}>
										<b>Species</b>
										<div>{species}</div>
									</Col>
								</Row>
								<Divider dashed/>
								<b>Gender</b>
								<Gender male={data.evidence.gender.male} female={data.evidence.gender.female}/>	
								<Divider dashed/>
								<b>Age (Years)</b>
								<Age min={data.evidence.age.min} max={data.evidence.age.max}
									mean={data.evidence.age.mean} sd={data.evidence.age.sd}
									med={data.evidence.age.med} under={data.evidence.age.range.under}
									cutoff={data.evidence.age.range.cutoff} over={data.evidence.age.range.over}
								></Age>
						
							</Card>
						</Col>
						<Col span={12}>
							<Card title="Classification" size="small">
								<b>WHO Classification</b>
								<p>{data.evidence.whoclass ? data.evidence.whoclass : 'N/A'}</p>
								<b>Grade (Samples)</b>
								<p>{stage}</p>
							</Card>
							<Card title="Region" size="small">
								 <Region region={data.evidence.region}></Region>
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
						<p>{data.evidence.clinical.relevance ? data.evidence.clinical.relevance : 'N/A'}</p>
						<b>Implication</b>
						<p>{data.evidence.clinical.implication ? data.evidence.clinical.implication : 'N/A'}</p>
						<b>Treatment</b>
						<p>{data.evidence.clinical.treatment ? data.evidence.clinical.treatment : 'N/A'}</p>
					</Card>

					<Card title="Application" size="small">
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