import spotifyAtom from "client/atoms/spotify.atom";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import SpotifyWebApi from "spotify-web-api-js";

const useSpotify = (accessToken?: string | null): SpotifyWebApi.SpotifyWebApiJs | null => {
  const [spotify, setSpotify] = useRecoilState(spotifyAtom);

  useEffect(() => {
    if (!spotify && accessToken) {
      const Spotify = new SpotifyWebApi();
      Spotify.setAccessToken(accessToken);
      setSpotify(Spotify);
    }
  }, [accessToken, setSpotify, spotify]);

  return spotify;
};

export default useSpotify;
