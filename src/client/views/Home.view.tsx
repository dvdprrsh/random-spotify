import { AuthenticationAPI } from "apis/public/authentication.api";
import { SpotifyAPI } from "apis/spotify.api";
import authState from "client/atoms/auth.atom";
import { Box, Button, Text } from "grommet";
import { Spotify as SpotifyIcon } from "grommet-icons";
import useQuery from "hooks/useQuery.hook";
import useSpotify from "hooks/useSpotify.hook";
import { DateTime } from "luxon";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

const Home: React.FC = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const resetAuth = useResetRecoilState(authState);
  useSpotify();
  const parsed = useQuery<{ code?: string }>();
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    const res = await AuthenticationAPI.login();
    if (res) window.location.href = res;
  }, []);

  useEffect(() => {
    (async () => {
      if (!parsed.code) return;
      const res = await SpotifyAPI.getAccessToken(parsed.code);
      if (res) {
        const expiry = DateTime.utc().plus({ seconds: res.expires_in }).toISO();
        setAuth({ authCode: parsed.code, accessToken: res.access_token, refreshToken: res.refresh_token, expiry });
        navigate("./dashboard", { replace: true });
        return;
      }
      resetAuth();
    })();
  }, [navigate, parsed.code, resetAuth, setAuth]);

  return (
    <Box flex>
      <Text size="large" margin={{ bottom: "medium" }}>
        Login To Start Randomising
      </Text>
      {!auth?.accessToken && <Button onClick={handleLogin} color="brand" icon={<SpotifyIcon color="brand" />} label="Login with Spotify" />}
    </Box>
  );
};

export default Home;
