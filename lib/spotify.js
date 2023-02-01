
import SpotifyWebApi from "spotify-web-api-node";

// const scopes = [
//   // Users
//   "user-read-email",
//   "user-read-private",
//   // Playlists
//   "playlist-read-private",
//   "playlist-read-collaborative",
//   // Playback
//   "streaming",
//   "app-remote-control",
//   // Library
//   "user-library-read",
//   "user-library-modify", 
//   // Spotify Connect
//   "user-read-playback-state",
//   "user-modify-playback-state",
//   "user-read-currently-playing",
//   // Listening History
//   "user-read-playback-position",
//   "user-top-read",
//   "user-read-recently-played",
// ].join(",");

const scopes = ['user-library-read', 'user-read-private', 'user-read-email','user-modify-playback-state','user-read-playback-state',
 'user-read-playback-state','user-read-currently-playing','playlist-read-private','user-read-playback-position',
 'streaming','playlist-read-collaborative','user-read-recently-played','user-top-read']


const params = {
  scope: scopes,
};

  const queryParamString = new URLSearchParams(params);

  const LOGIN_URL =
    "https://accounts.spotify.com/authorize?" + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});


export default spotifyApi;

export { LOGIN_URL };


