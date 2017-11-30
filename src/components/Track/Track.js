import React from '.react';
import './Track.css';

class Track extends React.Component{
constructor(props){
  super(props);
  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
}

renderAction(isRemoval) {
  if (this.props.isRemoval){
  return <a className= "Track-action" onClick={this.removeTrack}>-</a>;
} else {
    return < a className="Track-action" onClick={this.addTrack}>+</a>;
    }
  }
//Step 45
  addTrack(){
    this.props.onAdd(this.props.track);
  }


  render(){
    return{
      <div className="Track">
  <div className="Track-information">

    <h3>this.props.track.name</h3>
    <p>this.props.track.artist| this.props.track.album</p>
  </div>
  <a className="Track-action"><!-- + or - will go here --></a>
  //Step 47 + element add the onClick property
  <div className ="+" onClick={this.addTrack}>
  <div className="-" onclick={this.removeTrack}>
  </div>
</div>
    }
  }
}

export default Track;
