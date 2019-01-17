import React from 'react';
import { Button, Radio, Icon } from 'antd';
import './Home.css'

const Home = () => {
	return (
		<div className = "banner">
			<div className = "text-wrapper">
				<h1>
					Gliobase
				</h1>
				<p>
					A glioblastoma multiforme (GBM) biomarker knowledge base
				</p>
			</div>
			<div className = "gitbub-btn">
				<Button icon="github" size="default" href="https://github.com/thehyve/gliobase">Github</Button>
			</div>
		</div>
	);
}

export default Home;

