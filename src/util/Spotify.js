const clientId = '4bf8cf53a5e24f2e8c9d5c61d0d968b0';
const redirect_uri = "http://localhost:3000/";

let accessToken = '';

const Spotify = {
getAccessToken(){
  if(accessToken){
    return accessToken;
  }
  //Step 79 & 80 & 81
 const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
 const urlExpiresIn= window.location.href.match(/expires_in=([^&]*)/);

if(urlAccessToken && urlExpiresIn){
  accessToken = urlAccessToken[1];
  const expiresIn = Number(urlExpiresIn[1]);
  window.setTimeout(() => accessToken = '', expiresIn * 1000);
  window.history.pushState('Access Token', null, '/');
  return accessToken;
}
else{
  const listUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
  window.location = listUrl;
    }
},
//Step 86
search(value){
  const accessToken = Spotify.getAccessToken();
  return fetch(`https://api.spotify.com/v1/search?type=track&q=${value}`,{headers: {Authorization: `Bearer ${accessToken}`}
  }).then(response => {
    return response.json();
  }).then(jsonResponse =>
    {if(!jsonResponse.tracks){
      return [];
    }
    return jsonResponse.tracks.items.map(track =>
      ({ id: track.id,
         name: track.name,
         artist: track.artists[0].name,
         album: track.album.name,
         uri: track.uri
      }));
    });
  },

  savePlaylist(playlistName, trackUris){
    if(!playlistName || !trackUris){
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userId = '';
    let playlistID ='';

    return fetch('https://api.spotify.com/v1/me',{
      headers: headers}
    ).then (response =>
      response.json()
  ).then (jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {headers: headers,
         method: 'POST',
         body: JSON.stringify({name: playlistName})
      }).then (response =>
         response.json()
      ).then (jsonResponse => {
          playlistID = jsonResponse.id;
         return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,
         {headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
      }).then (response =>
      response.json()
    ).then(jsonResponse => {
       playlistID = jsonResponse.id;
    })
      })
    });
  }
};
export default Spotify;
