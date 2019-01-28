import React, {Component} from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import { Layout } from 'antd';
import { BrowserRouter as Router, Route } from "react-router-dom";
import GlobalHeader from './components/GlobalHeader';
import GlobalSider from './components/GlobalSider';
import Search from './pages/Search';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';

const { Header, Content, Footer, Sider } = Layout;

const graphQlClient = new ApolloClient({});

class App extends Component {
	state = {
		collapsed: false,
	  };
	
	handleSiderCollapse = () => {
		this.setState({
		  collapsed: !this.state.collapsed,
		});
	};

	render() {
		const collapsed = this.state.collapsed;
		return (
			<ApolloProvider client={graphQlClient}>
			<Router>
				<Layout style={{ minHeight: '100vh' }}>
					<Sider 
						className="sider" 
						trigger={null}
						collapsible
						collapsed={this.state.collapsed}
					>
						<GlobalSider />
					</Sider>
					<Layout>
						<Header style={{ padding: 0 }}>
							<GlobalHeader 
								collapsed={collapsed}
								onClickCollapseIcon={this.handleSiderCollapse}
								currentUser={{
									name: 'Xiaoyu Zhang',
									avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
									userid: '00000001',
								}}
							/>
						</Header>
						<Content style={{ margin: '0 16px' }}>
							<div style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, }}>
								<Route exact path="/" component={Home} />
								<Route path="/search" component={Search} />
								<Route path="/profile" component={Profile} />
								<Route path="/settings" component={Settings} />
								<Route path="/login" component={Login} />
 							</div>
						</Content>
						<Footer style={{ textAlign: 'center' }}> 
							AiPBAND ©2018
						</Footer>
					</Layout>
				</Layout>
			</Router>
			</ApolloProvider>
		)
	}
}

export default App;
