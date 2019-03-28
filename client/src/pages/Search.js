import React, {Component} from 'react';
import { Input, AutoComplete, Divider } from 'antd';
import { loader } from 'graphql.macro';
import { ApolloConsumer } from 'react-apollo';
import './Search.css'
import Entities from '../components/tables/Entities';
import Biomarkers from '../components/tables/Biomarkers';
import Evidences from '../components/tables/Evidences';

const entitiesQuery = loader('../queries/searchTerms.graphql');

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

function renderTitle(title) {
  	return <span>{title}</span>;
}

const processOptions = (options, value) => {
	value = value?value:""

	const entities = options.entitiesSearch.map(bm => (
		<Option key={bm.id} value={bm.id}>
        	{bm.name}
        	<span className="certain-search-item-count">{bm.id}</span>
      	</Option>
	))
	const biomarkers = options.biomarkerSearch.map(bms => (
		<Option key={bms.id} value={bms.id}>
        	{bms.entities.map(en => en.shortName).join(" ")}
        	<span className="certain-search-item-count">{bms.id}</span>
      	</Option>
	))
	const evidences = options.evidencesSearch.map(e => (
		<Option key={e.id} value={e.id}>
        	{e.id+' - '+e.pmid}
        	<span className="certain-search-item-count">{e.biomarkerId}</span>
      	</Option>
	))
	entities.length = Math.min(entities.length, 5)
	biomarkers.length = Math.min(biomarkers.length, 5)
	evidences.length = Math.min(evidences.length, 5)
	return [
		<OptGroup key="entities" label={renderTitle("Entities")}>
			{entities}
		</OptGroup>,
		<OptGroup key="biomarkers" label={renderTitle("Biomarkers")}>
			{biomarkers}
		</OptGroup>,
		<OptGroup key="evidences" label={renderTitle("Evidences")}>
			{evidences}
		</OptGroup>
	];
}

class Search extends Component {
	state = {
		data: [],
		raw: {
			entitiesSearch: [],
			biomarkerSearch: [],
			evidencesSearch: []
		}
	};
  
	render() {
	  	return <ApolloConsumer key="apollo-search">
				{client => {
					const fetchData = async (value) => {
						const { data } = await client.query({
							query: entitiesQuery,
							variables: value?{text: value}:null
						});
						this.setState(() => ({data: processOptions(data, value)}));
					}
					const fetchResult = async (value) => {
						const { data } = await client.query({
							query: entitiesQuery,
							variables: value?{text: value}:null
						});
						this.setState(() => ({raw: data}));
					}
					return <div>
						<AutoComplete 
							className="certain-category-search"
							dropdownClassName="certain-category-search-dropdown"
							dropdownMatchSelectWidth={false}
							size="large"
							style={{ width: '100%' }}
							onFocus={fetchData}
							onChange={fetchData}
							onSelect={fetchResult}
							dataSource={this.state.data}
							placeholder="Enter a search term to get started.."
							allowClear={true}
							optionLabelProp="value">
							<Input/>
						</AutoComplete>
						<Divider orientation="left">Entities</Divider>
						<Entities data={this.state.raw.entitiesSearch}/>
						<Divider orientation="left">Biomarkers</Divider>
						<Biomarkers data={this.state.raw.biomarkerSearch}/>
						<Divider orientation="left">Evidences</Divider>
						<Evidences data={this.state.raw.evidencesSearch}/>
					</div>
				}}
			</ApolloConsumer>;
	}
}

export default Search;