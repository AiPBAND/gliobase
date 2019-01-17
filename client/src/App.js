import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import Biomarkers from './components/Biomarkers';
import BiomarkerSets from './components/BiomarkersSets';
import Home from './components/Home';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from './components/Search';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const graphQlClient = new ApolloClient({});

const App = () => (
	<ApolloProvider client={graphQlClient}>
	<Router>
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible>
          		<div className="logo" style={{ height: '64px', background: '#022141'}}/>
          			<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            			<Menu.Item key="1">
							<Link to="/">
								<Icon type="home"/>
								<span>Home</span>
							</Link>
            			</Menu.Item>
						<Menu.Item key="2">
							<Link to="/search">
								<Icon type="search"/>
								<span>Search</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="3">
							<Icon type="pie-chart" />
							<span>Exploration</span>
						</Menu.Item>
						<SubMenu key="sub1" title={<span><Icon type="user" /><span>User</span></span>}>
							<Menu.Item key="4">Profile</Menu.Item>
							<Menu.Item key="5">Settings</Menu.Item>
						</SubMenu>
						
          			</Menu>
        	</Sider>
			<Layout>
				<Header style={{ padding: 0 }} />
				<Content style={{ margin: '0 16px' }}>
					<div style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, }}>
						<Route exact path="/" component={Home} />
        				<Route path="/search" component={Search} />
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}> 
					AiPBAND ©2018
				</Footer>
			</Layout>
    	</Layout>
	</Router>
  	</ApolloProvider>
);

export default App;
