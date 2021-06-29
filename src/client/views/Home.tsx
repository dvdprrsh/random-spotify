import { AuthenticationAPI } from "apis/public/authentication.api";
import { SpotifyAPI } from "apis/spotify.api";
import useAuthContext from "contexts/auth.context";
import { Box, Button, Text } from "grommet";
import { Spotify as SpotifyIcon } from "grommet-icons";
import useQuery from "hooks/useQuery.hook";
import useSpotify from "hooks/useSpotify.hook";
import Cookies from "js-cookie";
import { DateTime } from "luxon";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const parsed = useQuery<{ code?: string }>();
  const [state, actions] = useAuthContext();
  useSpotify(state.accessToken);
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    const res = await AuthenticationAPI.login();
    if (res) window.location.href = res;
  }, []);

  useEffect(() => {
    (async () => {
      if (!parsed.code) return;
      Cookies.set("_authcode", parsed.code);
      const res = await SpotifyAPI.getAccessToken(parsed.code);
      if (res) {
        Cookies.set("_token", res.access_token, { expires: DateTime.utc().plus({ seconds: res.expires_in }).toJSDate() });
        Cookies.set("_refreshtoken", res.refresh_token);
        Cookies.set("_exp", DateTime.utc().plus({ seconds: res.expires_in }).toISO());
        actions.setState({ accessToken: res.access_token, refreshToken: res.refresh_token });
        navigate("./", { replace: true });
      }
    })();
  }, [actions, navigate, parsed.code]);

  return (
    <Box flex>
      <Text size="large" margin={{ bottom: "medium" }}>
        Login To Start Randomising
      </Text>
      {!state.accessToken && <Button onClick={handleLogin} color="brand" icon={<SpotifyIcon color="brand" />} label="Login with Spotify" />}
    </Box>
  );
};

export default Home;
