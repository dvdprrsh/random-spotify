import authState from "client/atoms/auth.atom";
import spotifyAtom from "client/atoms/spotify.atom";
import useSpotify from "client/hooks/useSpotify.hook";
import { Box, Button, Header as GrommetHeader, Heading, Nav, Text, ThemeMode } from "grommet";
import { Logout, Moon, Sun } from "grommet-icons";
import { forwardRef, ForwardRefRenderFunction, MouseEventHandler, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";

interface Props {
  initialThemeMode: ThemeMode;
}

const Marquee = styled(Text)`
  overflow: hidden;
  position: relative;
  width: 100%;
  & > * {
    @keyframes marquee {
      25% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-90%);
      }
    }
    animation: marquee 20s infinite linear;
    position: absolute;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const Header: ForwardRefRenderFunction<{ themeMode: ThemeMode }, Props> = ({ initialThemeMode }: Props, ref) => {
  const navigate = useNavigate();
  const spotify = useSpotify();
  const auth = useRecoilValue(authState);
  const resetAuth = useResetRecoilState(authState);
  const resetSpotify = useResetRecoilState(spotifyAtom);
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialThemeMode);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<SpotifyApi.CurrentPlaybackResponse | null>(null);

  const lightMode = useMemo(() => themeMode === "light", [themeMode]);

  useImperativeHandle(
    ref,
    () => ({
      themeMode,
    }),
    [themeMode]
  );

  const handleThemeModeSwitch = useCallback(() => setThemeMode((s) => (s === "dark" ? "light" : "dark")), []);

  const handleTitleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault();
      navigate("/");
    },
    [navigate]
  );

  const handleCurrentlyPlaying = useCallback(async () => {
    if (!spotify) return setCurrentlyPlaying(null);
    const res = await spotify.getMyCurrentPlaybackState();
    setCurrentlyPlaying(res);
  }, [spotify]);

  const handleLogout = useCallback(() => {
    resetAuth();
    resetSpotify();
    setCurrentlyPlaying(null);
  }, [resetAuth, resetSpotify]);

  useEffect(() => {
    handleCurrentlyPlaying();
  }, [handleCurrentlyPlaying, spotify]);

  useEffect(() => {
    if (currentlyPlaying?.item && currentlyPlaying.progress_ms) {
      const timeout = setTimeout(handleCurrentlyPlaying, currentlyPlaying.item.duration_ms - currentlyPlaying.progress_ms + 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentlyPlaying, handleCurrentlyPlaying]);

  return (
    <Box
      flex="shrink"
      align="center"
      justify="center"
      fill="horizontal"
      pad={{ horizontal: "small" }}
      margin={{ bottom: "large" }}
      background="brand"
    >
      <GrommetHeader width={{ width: "100%", max: "xlarge" }} justify="center" animation="fadeIn">
        <Box flex align="center">
          {currentlyPlaying && (
            <Box width="100%" flex direction="row" justify="center" animation="fadeIn">
              <Text size="small" margin={{ right: "0.5em" }}>
                Now&nbsp;Playing:
              </Text>
              <Marquee size="small">
                <Text size="small">
                  <strong>{currentlyPlaying.item?.name}</strong> by{" "}
                  <strong>
                    {(currentlyPlaying.item as SpotifyApi.TrackObjectFull | undefined)?.artists.map((artist) => artist.name).join(", ")}
                  </strong>
                </Text>
              </Marquee>
            </Box>
          )}
        </Box>

        <Box flex align="center">
          <Button onClick={handleTitleClick} href="/" size="large">
            <Heading size="small">Randomise Spotify</Heading>
          </Button>
        </Box>
        <Nav flex direction="row" justify="end" gap="small">
          <Button
            onClick={handleThemeModeSwitch}
            icon={lightMode ? <Sun color="brand-secondary" size="medium" /> : <Moon color="brand-secondary" size="medium" />}
            a11yTitle={`Toggle ${lightMode ? "dark" : "light"} mode`}
            tip={`Toggle ${lightMode ? "dark" : "light"} mode`}
            size="small"
            hoverIndicator
          />
          {auth && <Button onClick={handleLogout} icon={<Logout color="brand-secondary" />} a11yTitle="Logout" tip="Logout" hoverIndicator />}
        </Nav>
      </GrommetHeader>
    </Box>
  );
};

export default forwardRef(Header);
