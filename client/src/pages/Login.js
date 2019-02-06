import React, {Component} from 'react';
import LoginForm from '../components/LoginForm'
import './Login.css'

class Login extends Component {
	render(){
		return (
			<div className="login-form">
        <LoginForm/>
      </div>
		);
	};
}

export default Login;