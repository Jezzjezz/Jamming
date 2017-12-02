import React, { Component } from 'react';
import './App.css';
import Spotify from '../../util/Spotify.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

class App extends Component {
  constructor(props){
  super(props);
  this.state = {
    searchResults: [],
    playlistName: 'New Playlist',
    playlistTracks: []
  };


this.addTrack = this.addTrack.bind(this);
this.removeTrack = this.removeTrack.bind(this);
this.updatePlaylistName = this.updatePlaylistName.bind(this);
this.searchSpotify = this.searchSpotify.bind(this);
this.savePlaylist = this.savePlaylist.bind(this);
  }
  //Step 41 create method called addTrack
  addTrack(track){
    let actualPlaylist = false;
    this.state.playlistTracks.forEach(trackObj => {
      if (trackObj.id === track.id) {
        actualPlaylist = true;
      }
    });
      if (!actualPlaylist){
        let tracks = this.state.playlistTracks;
        tracks.push(track);
        this.setState({playlistTracks: tracks});
      }
  }
//Step 49 create method removeTrack
  removeTrack(track){
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(
        playlistTrack => playlistTrack.id !== track.id)
    })
  }
  //step 57 sets the state of the playlistName to the input
  updatePlaylistName(name){
    this.setState({playlistName: name});
  }
  //Step 63
  savePlaylist(){
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.uri);
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      searchResults: []
    });
  }
  //Step 67 use spotify to search the term & then take the searchresults and updates the state
  searchSpotify(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.searchSpotify}/>
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
          onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
