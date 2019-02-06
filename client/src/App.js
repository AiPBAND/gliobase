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


const graphQlClient = new ApolloClient({});

class App extends Component {
	render() {
		return (
			<ApolloProvider client={graphQlClient}>
			<Router>
        <MainLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/profile" component={Profile} />
            <Route path="/settings" component={Settings} />
            <Route path="/login" component={Login} />
          </Switch>
        </MainLayout>
			</Router>
			</ApolloProvider>
		)
	}
}

export default App;
