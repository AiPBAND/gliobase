import React, {Component} from 'react';
import { Card, Avatar } from 'antd';

import biomarkerslogo from '../assets/experiment.svg';
import biomarkersetslogo from '../assets/folder-open.svg';
import evidenceslogo from '../assets/book.svg'

const { Meta } = Card;

const gridStyle = {
    width: '1/3',
    cursor: 'pointer'
};

class DataSummary extends Component{
    render(){
        return(
            <Card title="Data Summary">
                <Card.Grid style={gridStyle} onClick={this.props.onClickBiomarkers}>
                    <Meta
                        avatar={<Avatar src={biomarkerslogo} />}
                        title="Biomarkers"
                        description={this.props.numberOfBiomarker}
                    />
                </Card.Grid>
                <Card.Grid style={gridStyle} onClick={this.props.onClickBiomarkerSets}>
                    <Meta
                        avatar={<Avatar src={biomarkersetslogo} />}
                        title="Biomarker Sets"
                        description={this.props.numberOfBiomarkerSet}
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