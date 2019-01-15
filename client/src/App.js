import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import Biomarkers from './components/Biomarkers';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
  
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const graphQlClient = new ApolloClient({});

const App = () => (
	<ApolloProvider client={graphQlClient}>
		<div>
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible>
          		<div className="logo" />
				  <Header style={{ background: '#022141', padding: 0 }} />
          			<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            			<Menu.Item key="1">
              				<Icon type="home" />
              				<span>Home</span>
            			</Menu.Item>
            			<Menu.Item key="2">
							<Icon type="search" />
							<span>Search</span>
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
			<Header style={{ background: '#fff', padding: 0 }} />
			<Content style={{ margin: '0 16px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Search</Breadcrumb.Item>
					<Breadcrumb.Item>Biomarkers</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
					<Biomarkers/>
				</div>
			</Content>
			<Footer style={{ textAlign: 'center' }}> 
				AiPBAND ©2018
			</Footer>
        </Layout>
    </Layout>
      		
    </div>
  	</ApolloProvider>
);

export default App;
