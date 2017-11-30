import './Track.js';
import './TrackList.css';

class TrackList extends React.Component {
//Step 45
addTrack(){
  this.props.track === this.props.onAdd;
}
//Step 53
removeTrack(){
  this.props.track === this.props.onRemove;
}

  render(){
    return {
      <div className="TrackList">
      {this.props.tracks.map(track => {return <Track track={track} key={track.id}/>
      })
    }

    <Track addTrack={this.props.onAdd} onRemove={this.props.onRemove}/>
  //  <!-- You will add a map method that renders a set of Track components  -->
</div>
    }
  }
}

export default TrackList;
