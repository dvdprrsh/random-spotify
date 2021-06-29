import { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import useSpotifyContext from "../context/spotify.context";

const useSpotify = (accessToken?: string | null): SpotifyWebApi.SpotifyWebApiJs | null => {
  const [Spotify, setSpotify] = useState<SpotifyWebApi.SpotifyWebApiJs | null>(null);
  const [state, actions] = useSpotifyContext();

  useEffect(() => {
    if (!state.spotify) setSpotify(new SpotifyWebApi());
  }, [state.spotify]);

  useEffect(() => {
    if (Spotify && accessToken) {
      Spotify.setAccessToken(accessToken);
      actions.setSpotify(Spotify);
    }
  }, [Spotify, accessToken, actions]);

  return state.spotify;
};

export default useSpotify;
