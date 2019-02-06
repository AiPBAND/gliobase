import React, {Component} from 'react';
import './MainLayout.css';
import { Layout } from 'antd';
import GlobalHeader from './GlobalHeader';
import GlobalSider from './GlobalSider';

const { Header, Content, Footer, Sider } = Layout;

class MainLayout extends Component {
	state = {
		collapsed: false,
	};
	
	handleSiderCollapse = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
    const { children } = this.props;
		const collapsed = this.state.collapsed;
		return (
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
            <div style={{margin: '24px 16px', padding: 48, background: '#fff', minHeight: 280}}>
              { children }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}> 
            AiPBAND ©2018
          </Footer>
        </Layout>
      </Layout>
		)
	}
}

export default MainLayout;
