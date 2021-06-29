import { Action, createContainer, createHook, createStore } from "react-sweet-state";
import SpotifyWebApi from "spotify-web-api-js";

interface SpotifyState {
  spotify: SpotifyWebApi.SpotifyWebApiJs | null;
}

type SpotifyActions = typeof actions;

const actions = {
  setSpotify:
    (spotify: SpotifyWebApi.SpotifyWebApiJs): Action<SpotifyState> =>
    ({ setState }) =>
      setState({ spotify }),
  clearState:
    (): Action<SpotifyState> =>
    ({ setState }) =>
      setState({ spotify: null }),
};

const Store = createStore<SpotifyState, SpotifyActions>({
  initialState: {
    spotify: null,
  },
  actions,
  name: "SpotifyContext",
});

export const SpotifyContextContainer = createContainer(Store);

const useSpotifyContext = createHook(Store);

export default useSpotifyContext;
