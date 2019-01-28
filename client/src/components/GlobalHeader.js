import React, { Component } from 'react';
import { Menu, Icon, Dropdown, Avatar, Button } from 'antd';
import { Link } from "react-router-dom";
import './GlobalHeader.css'

class GlobalHeader extends Component{
  constructor(props) {
		super(props);
		this.state = {
		  currentUser: this.props.currentUser,
    };
	}

  handleClickLogout = () => {
    this.setState({
      currentUser: {},
    })
  };

  render(){
    const {
      collapsed,
      onClickCollapseIcon,
    } = this.props;

    const menu = (
      <Menu className="menu" selectedKeys={[]}>
        <Menu.Item>
          <Link to="/profile">
            <Icon type="user"/>
            <span>Profile</span>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/settings">
            <Icon type="setting"/>
            <span>Settings</span>
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" onClick={this.handleClickLogout}>
          <Icon type="logout"/>
          Logout
        </Menu.Item>
      </Menu>
    );
    
    return(
      <div className="header">
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={onClickCollapseIcon}
        />
        <div className="toolbar">
          {this.state.currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className="user-info">
                <Avatar className="user-avatar" size="small" src={this.state.currentUser.avatar} />
                <span className="user-name">{this.state.currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Button size="small" style={{ margin: '0 24px' }}>
              <Link to="/login">
                <span>Login</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    )
  }
}

export default GlobalHeader