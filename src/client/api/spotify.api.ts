import { AuthorizationCodeGrantResponse } from "spotify-web-api-node";
import superagent from "superagent";
import prefix from "superagent-prefix";

const spotifyAPI = superagent.agent().use(prefix("/api/spotify"));

export const getAccessToken = async (authCode: string): Promise<AuthorizationCodeGrantResponse | null> => {
  try {
    const res = await spotifyAPI.get("/access-token").query({ authcode: authCode }).withCredentials();
    return res.body;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export * as SpotifyAPI from "./spotify.api";
