import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { ApolloProvider } from "react-apollo";
import Biomarkers from './components/Biomarkers'

const graphQlClient = new ApolloClient({});

const App = () => (
	<ApolloProvider client={graphQlClient}>
		<div>
      		<Biomarkers/>
    	</div>
  	</ApolloProvider>
);

export default App;
