import React, {Component} from 'react';
import { Query } from 'react-apollo';
import { loader } from 'graphql.macro';
import { Card, Alert, List, Row, Col, Typography, Divider, Skeleton} from 'antd';
import './Evidence.css';
import Source from '../../components/tags/Source';
import Gender from '../../components/utilities/Gender'
import Age from '../../components/utilities/Age'
import Species from '../../components/tags/Species';
import Stage from '../../components/tags/Stage';
import BiomoleculeList from '../../components/lists/BiomoleculeList';
import Region from '../../components/utilities/Region';
import Marker from '../../components/utilities/Marker';
import PubmedLink from '../../components/PubmedLink';
const { Title, Text } = Typography;

const evidenceQuery = loader('../../queries/evidence.graphql');

class Evidence extends Component {
	render() {
		const bioid = this.props.match.params.id;
		return(
			<Query query={evidenceQuery} variables={{id: bioid}}>
			{({ loading, error, data }) => {
				if (loading) return <Skeleton/>;
				if (error) return <p>Error</p>;

        		//Watch out null value!
				const sources = data.evidence.sourceIds ? data.evidence.sourceIds.map(id => {
					return <Source name={id} key={id}/>;
				}) : 'N/A';

				const species = data.evidence.species ? data.evidence.species.map(id => {
					return <Species name={id} key={id}/>
				}) : 'N/A';

				const stage = data.evidence.stage ?  data.evidence.stage.map(id => {
					return <Stage name={id} key={id}/>
				}) : 'N/A';

				const getMessage = (val) =>{
					if(val === "YES") return "Yes"
					if(val === "NO") return "No"
					if(val === "Potential") return "Potential"
					return "This information is unavailable";
				}

				const getType = (val) =>{
					if(val === "YES") return "success"
					if(val === "NO") return "error"
					if(val === "Potential") return "info"
					return "warning";
				}

				return (<div>

					<Title>
						{data.evidence.id}
		                <Marker val={data.evidence.application.validated}></Marker> 
					</Title>
				    <PubmedLink pmid={data.evidence.pmid}></PubmedLink>
					
					<BiomoleculeList data={data.evidence.biomarker.biomolecules}></BiomoleculeList>

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
									avg={data.evidence.age.avg} sd={data.evidence.age.sd}
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
								<br/>{stage}
							</Card>
							<Card title="Region (authorship)" size="small">
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
							message={getMessage(data.evidence.application.diagnosis)}
							type={getType(data.evidence.application.diagnosis)}
							showIcon
						/>
						<b>Prognostic application</b>
						<Alert
							message={getMessage(data.evidence.application.prognosis)}
							type={getType(data.evidence.application.prognosis)}
							showIcon
						/>
						<b>Predictive application</b>
						<Alert
							message={getMessage(data.evidence.application.predictive)}
							type={getType(data.evidence.application.predictive)}
							showIcon
						/>
						<b>Therapeutic application</b>
						<Alert
							message={getMessage(data.evidence.application.therapeutic)}
							type={getType(data.evidence.application.therapeutic)}
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