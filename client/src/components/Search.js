import React, {Component} from 'react';
import { Icon, Input, AutoComplete } from 'antd';
import { loader } from 'graphql.macro';
import { Query } from "react-apollo";
import { ApolloConsumer } from 'react-apollo';
import './Search.css'

const biomarkersQuery = loader('../queries/searchTerms.graphql');


const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

function renderTitle(title) {
  return (
    <span>
      {title}
      <a
        style={{ float: 'right' }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >更多
      </a>
    </span>
  );
}

const processOptions = (options) => {
	const biomarkers = options.biomarkersSearch.map(bm => (
		<Option key={bm.id} value={bm.id}>
        	{bm.id}
        	<span className="certain-search-item-count">{bm.name}</span>
      	</Option>
	))
	const sets = options.biomarkerSetSearch.map(bms => (
		<Option key={bms.id} value={bms.id}>
        	{bms.id}
        	<span className="certain-search-item-count">{bms.biomarkerIds}</span>
      	</Option>
	))
	return [
		<OptGroup key="biomarkers" label={renderTitle("Biomarkers")}>
			{biomarkers}
		</OptGroup>,
		<OptGroup key="biomarkerSets" label={renderTitle("Biomarker sets")}>
			{sets}
		</OptGroup>
	];
}

class Search extends Component {
	state = { data: []};
  
	render() {
	  	return (
			<ApolloConsumer>
				{client => {
					const fetchData = async (value) => {
						const { data } = await client.query({
							query: biomarkersQuery,
							variables: value?{text: "/.*"+value.replace(" ", ".*/ /.*")+".*/"}:null
						});
						this.setState(() => ({data: processOptions(data)}));
					}
					return <AutoComplete 
						className="certain-category-search"
						dropdownClassName="certain-category-search-dropdown"
						dropdownMatchSelectWidth={false}
						size="large"
						style={{ width: '100%' }}
						onChange={fetchData}
						onFocus={fetchData}
						dataSource={this.state.data}
						placeholder="input here"
						optionLabelProp="value">
						<Input suffix={<Icon type="search" className="certain-category-icon" />} />
					</AutoComplete>
				}}
			</ApolloConsumer>
	  	);
	}
}

export default Search;