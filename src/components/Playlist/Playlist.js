import React from '.react';
import TrackList from '';
import './Playlist.css';

class Playlist extends React.Component {
constructor(props){
  super(props);
  this.state.handleNameChange = this.handleNameChange.bind(this);
}
  //Step 59
  handleNameChange(event){
    this.props.onNameChange(event.target.input);
  }

  render(){
    return (
      <div className="Playlist">
  <input defaultvalue={'New Playlist'}/>
  <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove}/>
  //Step 61
  <Playlist onChange={this.handleNameChange}/>
//  <!-- Add a TrackList component -->
  <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
</div>
    )
  }
}

export default Playlist;
