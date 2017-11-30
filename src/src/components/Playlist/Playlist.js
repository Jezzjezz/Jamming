import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './Playlist.css';

class Playlist extends React.Component {
constructor(props){
  super(props);
  this.handleNameChange = this.handleNameChange.bind(this);
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
  <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
</div>
    )
  }
}

export default Playlist;
