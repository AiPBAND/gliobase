import React, {Component} from 'react';
import { Icon, Input, AutoComplete, Divider } from 'antd';
import { loader } from 'graphql.macro';
import { Query } from "react-apollo";
import { ApolloConsumer } from 'react-apollo';
import './Search.css'
import Biomarkers from '../components/Biomarkers';
import BiomarkerSets from '../components/BiomarkersSets';

const biomarkersQuery = loader('../queries/searchTerms.graphql');


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

	const biomarkers = options.biomarkersSearch.map(bm => (
		<Option key={bm.id} value={bm.id}>
        	{bm.id}
        	<span className="certain-search-item-count">{bm.name}</span>
      	</Option>
	))
	const sets = options.biomarkerSetSearch.map(bms => (
		<Option key={bms.id} value={bms.id}>
        	{bms.id}
        	<span className="certain-search-item-count">{bms.biomarkerIds.join(" ")}</span>
      	</Option>
	))
	return [
		<OptGroup key="terms" label={renderTitle("Terms")}>
			{terms}
		</OptGroup>,
		<OptGroup key="biomarkers" label={renderTitle("Biomarkers")}>
			{biomarkers}
		</OptGroup>,
		<OptGroup key="biomarkerSets" label={renderTitle("Biomarker sets")}>
			{sets}
		</OptGroup>
	];
}

class Search extends Component {
	state = {
		data: [],
		raw: {
			biomarkersSearch: [],
			biomarkerSetSearch: []
		}
	};
  
	render() {
	  	return (
			<ApolloConsumer>
				{client => {
					const fetchData = async (value) => {
						const { data } = await client.query({
							query: biomarkersQuery,
							variables: value?{text: value}:null
						});
						this.setState(() => ({data: processOptions(data, value)}));
					}
					const fetchResult = async (value) => {
						const { data } = await client.query({
							query: biomarkersQuery,
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
						<Divider orientation="left">Biomarkers</Divider>,
						<Biomarkers data={this.state.raw.biomarkersSearch}></Biomarkers>,
						<Divider orientation="left">Biomarker Sets</Divider>,
						<BiomarkerSets data={this.state.raw.biomarkerSetSearch}></BiomarkerSets>
					]
				}}
			</ApolloConsumer>
	  	);
	}
}

export default Search;