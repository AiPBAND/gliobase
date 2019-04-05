import React, {Component} from 'react';
import './BioID.css';
class BioID extends Component {
	render() {
        function refLink(ref) {
			if (ref.charAt(0) === "M") return "biomolecule";
			if (ref.charAt(0) === "E") return "evidence";
			if (ref.charAt(0) === "K") return "biomarker";
			else return "notfound";
		}
		function getColor(name) {
			if (name.charAt(0) === "M") return " biomolecule-id";
			if (name.charAt(0) === "E") return " evidence-id";
			if (name.charAt(0) === "K") return " biomarker-id";
			else return "";
		}
		function drag(ev) {
			ev.dataTransfer.setData("text", ev.target.id);
		}
		return (
		<a id={this.props.id} 
			href={"/"+refLink(this.props.id)+"/"+this.props.id} 
			className="bio-id" draggable onDragStart={drag}>
			<div className="bio-id-name">{this.props.name}</div>
			<div className={"bio-id"+getColor(this.props.id)}>{this.props.id}</div>
		</a>
    )
	}
}
export default BioID