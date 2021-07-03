// import { Action, createContainer, createHook, createStore } from "react-sweet-state";
import { atom } from "recoil";
import SpotifyWebApi from "spotify-web-api-js";

type SpotifyState = SpotifyWebApi.SpotifyWebApiJs | null;

// type SpotifyActions = typeof actions;

// const actions = {
//   setSpotify:
//     (spotify: SpotifyWebApi.SpotifyWebApiJs): Action<SpotifyState> =>
//     ({ setState }) =>
//       setState({ spotify }),
//   clearState:
//     (): Action<SpotifyState> =>
//     ({ setState }) =>
//       setState({ spotify: null }),
// };

// const Store = createStore<SpotifyState, SpotifyActions>({
//   initialState: {
//     spotify: null,
//   },
//   actions,
//   name: "SpotifyContext",
// });

const spotifyAtom = atom<SpotifyState>({
  key: "Spotify",
  default: null,
});

export default spotifyAtom;
