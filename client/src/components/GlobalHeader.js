import React, {Component} from 'react';
import { Menu, Icon, Dropdown, Avatar, Spin } from 'antd';
import { Link } from "react-router-dom";
import './GlobalHeader.css'

class GlobalHeader extends Component{
    render(){
      const {
        collapsed,
        onClickCollapseIcon,
        currentUser = {}
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
          <Menu.Item key="logout">
            <Icon type="logout" />Logout
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
            {currentUser.name ? (
              <Dropdown overlay={menu}>
                <span className="user-info">
                  <Avatar className="user-avatar" size="small" src={currentUser.avatar} />
                  <span className="user-name">{currentUser.name}</span>
                </span>
              </Dropdown>
            ) : (
              <Spin size="default" style={{ margin: '0 28px' }} />
            )}
          </div>
        </div>
      )
    }
}

export default GlobalHeader