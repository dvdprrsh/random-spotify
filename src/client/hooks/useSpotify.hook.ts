import authState from "client/atoms/auth.atom";
import spotifyAtom from "client/atoms/spotify.atom";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import SpotifyWebApi from "spotify-web-api-js";

const useSpotify = (): SpotifyWebApi.SpotifyWebApiJs | null => {
  const auth = useRecoilValue(authState);
  const [spotify, setSpotify] = useRecoilState(spotifyAtom);

  useEffect(() => {
    if (!spotify && auth?.accessToken) {
      const Spotify = new SpotifyWebApi();
      Spotify.setAccessToken(auth?.accessToken);
      setSpotify(Spotify);
    }
  }, [auth?.accessToken, setSpotify, spotify]);

  return spotify;
};

export default useSpotify;
