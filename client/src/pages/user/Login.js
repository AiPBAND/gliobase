import React, {Component} from 'react';
import LoginForm from '../../components/LoginForm'
import './Login.css'
import aipbandlogo from '../../assets/AiPBAND-logo.webp'

class Login extends Component {
	render(){
		return (
			<div className="login">
        <div className="login-logo">
          <img src={aipbandlogo} alt="logo" width="140px" />
          <h1>Gliobase</h1>
        </div>
        <LoginForm/>
      </div>
		);
	};
}

export default Login;