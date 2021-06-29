import { AuthState } from "contexts/auth.context";
import { DateTime } from "luxon";
import { ORIGIN, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_WEB_PLAYBACK_SCOPES } from "server/config";
import SpotifyWebApi, { RefreshAccessTokenResponse } from "spotify-web-api-node";

const spotify = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUri: ORIGIN,
});

export const getAuthorisationURL = (): string => spotify.createAuthorizeURL(SPOTIFY_WEB_PLAYBACK_SCOPES, "");

export const getAccessToken = async (authCode: string): Promise<SpotifyWebApi.AuthorizationCodeGrantResponse> => {
  const res = await spotify.authorizationCodeGrant(authCode);
  return res.body;
};

export const refreshAccessToken = async (token: string, refreshToken: string): Promise<RefreshAccessTokenResponse> => {
  try {
    spotify.setAccessToken(token);
    spotify.setRefreshToken(refreshToken);
    const res = await spotify.refreshAccessToken();
    return res.body;
  } finally {
    spotify.resetAccessToken();
    spotify.resetRefreshToken();
  }
};

export const getAuthState = async (cookies: {
  _authcode?: string;
  _token?: string;
  _exp?: string;
  _refreshtoken?: string;
}): Promise<AuthState & { authCode: string | null; expiry: Date | null }> => {
  console.log(DateTime.fromISO(cookies._exp!).diffNow("minutes").minutes);
  try {
    if (cookies._token && cookies._refreshtoken && cookies._exp && DateTime.fromISO(cookies._exp).diffNow("minutes", {}).minutes < 10) {
      const res = await refreshAccessToken(cookies._token, cookies._refreshtoken);
      return {
        authCode: cookies._authcode ?? null,
        accessToken: res.access_token,
        refreshToken: res.refresh_token ?? null,
        expiry: typeof res.expires_in === "number" ? DateTime.utc().plus({ seconds: res.expires_in! }).toJSDate() : null,
      };
    }
    if (cookies._token) {
      return {
        authCode: cookies._authcode ?? null,
        accessToken: cookies._token,
        refreshToken: cookies._refreshtoken ?? null,
        expiry: cookies._exp ? DateTime.fromISO(cookies._exp).toJSDate() : null,
      };
    }
    if (cookies._authcode) {
      const res = await getAccessToken(cookies._authcode);
      return {
        authCode: cookies._authcode ?? null,
        accessToken: res.access_token,
        refreshToken: res.refresh_token,
        expiry: typeof res.expires_in === "number" ? DateTime.utc().plus({ seconds: res.expires_in }).toJSDate() : null,
      };
    }
    return { authCode: null, accessToken: null, refreshToken: null, expiry: null };
  } catch (error) {
    console.error(error);
    return { authCode: null, accessToken: null, refreshToken: null, expiry: null };
  } finally {
    spotify.resetAccessToken();
    spotify.resetRefreshToken();
  }
};
