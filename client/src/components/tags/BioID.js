import React, {Component} from 'react';
import './BioID.css';
class BioID extends Component {
	render() {
        function refLink(ref) {
			if (ref.charAt(0) === "E") return "entity";
			if (ref.charAt(0) === "V") return "evidence";
			if (ref.charAt(0) === "B") return "biomarker";
			else return "notfound";
		}
		function getColor(name) {
			if (name.charAt(0) === "E") return " entity-id";
			if (name.charAt(0) === "V") return " evidence-id";
			if (name.charAt(0) === "B") return " biomarker-id";
			else return "";
		}
		return (
    <a href={"/"+refLink(this.props.id)+"/"+this.props.id} className="bio-id">
			<div className="bio-id-name">{this.props.name}</div>
			<div className={"bio-id"+getColor(this.props.id)}>{this.props.id}</div>
		</a>
    )
	}
}
export default BioID