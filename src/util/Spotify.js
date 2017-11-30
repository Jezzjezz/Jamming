const clientId = '';
const redirect_uri = 'http://localhost:3000';

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
  return fetch(`https://api.spotify.com/v1/search?type=track&q=${value}`,{headers: {Authorization: `Bearer${accessToken}`}
  }).then(response => {
    return response.json();
  }).then(jsonResponse =>
    {if(jsonResponse.tracks){
      return jsonResponse.tracks.map(track =>
      ({ id: track.id,
         name: track.name,
         artist: track.artists[0].name,
         album: track.album.name,
         uri: track.uri
      }));
    }  else{ return [];
          }
    })
  },

  savePlaylist(playname,trackUris){
    if(!playname || !trackUris){
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer${accessToken}`};
    const userId = '';

    return fetch(`https://api.spotify.com/v1/me`,{headers: headers}
    ).then (response =>  response.json()
  ).then (jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`,
        {headers: headers,
         method: 'POST',
         body: JSON.stringify
        ({playname: playname})
      }).then (response => {
        return response.json();
      }).then (jsonResponse => {
         const playlistId = jsonResponse.id ;
         return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlistId}/tracks`,
         {headers: headers,
          method: 'POST',
          body: JSON.stringify
        ({uris: trackuris})
      });
      })
    });
  }
};
export default Spotify;
