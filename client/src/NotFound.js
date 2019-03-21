import React, {Component} from 'react';
import { Alert } from 'antd';

class NotFound extends Component {
	render() {
		return <Alert message="Oops!"
			description="The page you are looking for could not be found..."
			type="warning"
			showIcon
	  	/>
	}
}

export default NotFound