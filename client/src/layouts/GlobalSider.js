import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import './GlobalSider.css';
const SubMenu = Menu.SubMenu;

class GlobalSider extends Component {
  constructor(props) {
		super(props);
		this.state = {
		  siderSelectedKey: '1',
		};
  }
  
  selectFirstKey = () => {
    this.setState({
      siderSelectedKey: '1',
    });
	}

	selectSecondKey = () => {
    this.setState({
      siderSelectedKey: '2',
    });
	}

	selectThirdKey = () => {
    this.setState({
      siderSelectedKey: '3',
    });
	}

  render() {
    return (
      <div>
        <div className="global-sider-logo">
          <Link to="/">
            <span className="logo-big" onClick={this.selectFirstKey}>{this.props.collapsed ? "g" : "glio"}</span>
            <span className="logo-small" onClick={this.selectFirstKey}>DB</span>
          </Link>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} selectedKeys={[this.state.siderSelectedKey]} mode="inline">
          <Menu.Item key="1" onClick={this.selectFirstKey}>
            <Link to="/">
              <Icon type="home"/>
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" onClick={this.selectSecondKey}>
            <Link to="/search">
              <Icon type="search"/>
              <span>Search</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" onClick={this.selectThirdKey}>
            <Link to="/exploration">
              <Icon type="pie-chart" />
              <span>Exploration</span>
            </Link>            
          </Menu.Item>
          {/* <SubMenu key="sub1" title={<span><Icon type="user" /><span>User</span></span>}>
            <Menu.Item key="4">
            <Link to="/profile">
              <span>Profile</span>
            </Link>
            </Menu.Item>
            <Menu.Item key="5">
            <Link to="/settings">
              <span>Settings</span>
            </Link>
            </Menu.Item>
          </SubMenu> */}
        </Menu>
      </div>
    )
  };
}

export default GlobalSider
