import React, {Component} from 'react';
import { Card, Avatar } from 'antd';

import biomoleculeslogo from '../assets/experiment.svg';
import biomarkerslogo from '../assets/tags.svg';
import evidenceslogo from '../assets/read.svg'

const { Meta } = Card;

const gridStyle = {
    width: '1/3',
    cursor: 'pointer'
};

class DataSummary extends Component{
    render(){
        return(
            <Card title="Data Summary">
                <Card.Grid style={gridStyle} onClick={this.props.onClickBiomolecules}>
                    <Meta
                        avatar={<Avatar src={biomoleculeslogo} />}
                        title="Biomolecules"
                        description={this.props.numberOfBiomolecule}
                    />
                </Card.Grid>
                <Card.Grid style={gridStyle} onClick={this.props.onClickBiomarkers}>
                    <Meta
                        avatar={<Avatar src={biomarkerslogo} />}
                        title="Biomarkers"
                        description={this.props.numberOfBiomarker}
                    />
                </Card.Grid>
                <Card.Grid style={gridStyle} onClick={this.props.onClickEvidences}>
                    <Meta
                        avatar={<Avatar src={evidenceslogo} />}
                        title="Evidences"
                        description={this.props.numberOfEvidences}
                    />
                </Card.Grid>
            </Card>
        )
    }
}

export default DataSummary