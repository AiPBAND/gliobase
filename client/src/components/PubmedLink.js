import React, {Component} from 'react';
import { Button } from 'antd';
class PubmedLink extends Component{
    render(){
        
          return( 
            <p> PubMed ID:
                {' '}
                <Button type="Primary" size="small" href={"https://www.ncbi.nlm.nih.gov/pubmed/"+this.props.pmid}>
                        {this.props.pmid}
                </Button>
            </p> 
          )
    }
        
}
export default PubmedLink;