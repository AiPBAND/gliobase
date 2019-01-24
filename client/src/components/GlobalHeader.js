import React, {Component} from 'react';
import { Menu, Icon } from 'antd';
import './GlobalHeader.css'

class GlobalHeader extends Component{
    render(){

        const {
          onMenuClick,
        } = this.props;

        const menu = (
          <Menu className="menu" selectedKeys={[]} onClick={onMenuClick}>
            <Menu.Item>
              <Icon type="user" />Profile
            </Menu.Item>
            <Menu.Item>
              <Icon type="setting" />Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">
              <Icon type="logout" />Logout
            </Menu.Item>
          </Menu>
        );
        
        return(
          <div className="header">
            <p>
                hello
            </p>
          </div>
        )
    }
}

export default GlobalHeader