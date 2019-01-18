import React from 'react';
import { Button, Card, Icon, Avatar, Divider } from 'antd';
import './Home.css'
import biomarkerslogo from '../assets/experiment.svg';
import biomarkersetslogo from '../assets/folder-open.svg';
import literaturelogo from '../assets/book.svg'

const { Meta } = Card;

const gridStyle = {
	width: '33%',
};

const Home = () => {
	return (
		<div className = "content">
			<div className = "banner">
				<h1>Gliobase</h1>
				<p>A glioblastoma multiforme (GBM) biomarker knowledge base</p>
				<Button icon="github" size="small" href="https://github.com/thehyve/gliobase">Github</Button>
			</div>
			<Divider dashed />
			<div className = "data-summary">
				<Card title="Data Summary">
					<Card.Grid style={gridStyle}>
						<Meta
							avatar={<Avatar src={biomarkerslogo} />}
							title="Biomarkers"
							description="5"
						/>
					</Card.Grid>
					<Card.Grid style={gridStyle}>
						<Meta
							avatar={<Avatar src={biomarkersetslogo} />}
							title="Biomarker Sets"
							description="4"
						/>
					</Card.Grid>
					<Card.Grid style={gridStyle}>
						<Meta
							avatar={<Avatar src={literaturelogo} />}
							title="Lierature"
							description="8"
						/>
					</Card.Grid>
  				</Card>
			</div>
		</div>
	);
}

export default Home;

