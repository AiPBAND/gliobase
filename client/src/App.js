import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from './pages/Search';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import Biomarker from './pages/Biomarker';


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
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} />
            <Route path="/biomarker/:id" component={Biomarker} />
          </MainLayout>
        </Switch>
			</Router>
			</ApolloProvider>
		)
	}
}

export default App;
