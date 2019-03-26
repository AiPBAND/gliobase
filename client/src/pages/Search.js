import React, {Component} from 'react';
import { Input, AutoComplete, Divider } from 'antd';
import { loader } from 'graphql.macro';
import { ApolloConsumer } from 'react-apollo';
import './Search.css'
import Entities from '../components/tables/Entities';
import Biomarkers from '../components/tables/Biomarkers';

const entitiesQuery = loader('../queries/searchTerms.graphql');


const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

function renderTitle(title) {
  return (
    <span>
      {title}
    </span>
  );
}

const processOptions = (options, value) => {
	value = value?value:""
	const terms = [
		<Option key={value} value={value}>
        	{value}
        	<span className="certain-search-item-count">{value}</span>
      	</Option>
	]

	const entities = options.entitiesSearch.map(bm => (
		<Option key={bm.id} value={bm.id}>
        	{bm.id}
        	<span className="certain-search-item-count">{bm.name}</span>
      	</Option>
	))
	const biomarkers = options.biomarkerSearch.map(bms => (
		<Option key={bms.id} value={bms.id}>
        	{bms.id}
        	<span className="certain-search-item-count">{bms.entityIds.join(" ")}</span>
      	</Option>
	))
	return [
		<OptGroup key="terms" label={renderTitle("Terms")}>
			{terms}
		</OptGroup>,
		<OptGroup key="entities" label={renderTitle("Entities")}>
			{entities}
		</OptGroup>,
		<OptGroup key="biomarkers" label={renderTitle("Biomarkers")}>
			{biomarkers}
		</OptGroup>
	];
}

class Search extends Component {
	state = {
		data: [],
		raw: {
			entitiesSearch: [],
			biomarkerSearch: []
		}
	};
  
	render() {
	  	return (
			<ApolloConsumer>
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
					return [
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
							optionLabelProp="value">
							<Input/>
						</AutoComplete>,
						<Divider orientation="left">Entities</Divider>,
						<Entities data={this.state.raw.entitiesSearch}></Entities>,
						<Divider orientation="left">Biomarkers</Divider>,
						<Biomarkers data={this.state.raw.biomarkerSearch}></Biomarkers>
					]
				}}
			</ApolloConsumer>
	  	);
	}
}

export default Search;