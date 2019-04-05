import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Search from './pages/Search';
import Exploration from './pages/Exploration';
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';
import Login from './pages/user/Login';
import MainLayout from './layouts/MainLayout';
import Biomolecule from './pages/schemas/Biomolecule';
import Evidence from './pages/schemas/Evidence';
import Biomarker from './pages/schemas/Biomarker';
import NotFound from './NotFound';

const graphQlClient = new ApolloClient({});

class App extends Component {
	render() {
		return (
			<ApolloProvider client={graphQlClient}>
			<Router>
        <Switch>
          <Route path="/login" component={Login} />
          <MainLayout>        
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/exploration" component={Exploration} />
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} />
            <Route path="/biomolecule/:id" component={Biomolecule} />
			<Route path="/evidence/:id" component={Evidence} />
			<Route path="/biomarker/:id" component={Biomarker} />
			<Route path="/notfound" component={NotFound} />
          </MainLayout>
        </Switch>
			</Router>
			</ApolloProvider>
		)
	}
}

export default App;
