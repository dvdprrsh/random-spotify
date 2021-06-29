import useSpotify from "client/hooks/useSpotify.hook";
import { Box, Button, Header as GrommetHeader, Heading, Nav, Text, ThemeMode } from "grommet";
import { Moon, Sun } from "grommet-icons";
import { forwardRef, ForwardRefRenderFunction, MouseEventHandler, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialThemeMode);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<SpotifyApi.CurrentPlaybackResponse>();
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
    if (!spotify) return;
    const res = await spotify.getMyCurrentPlaybackState();
    setCurrentlyPlaying(res);
    if (res.item && res.progress_ms) setTimeout(handleCurrentlyPlaying, res.item.duration_ms - res.progress_ms);
  }, [spotify]);

  useEffect(() => {
    if (spotify) handleCurrentlyPlaying();
  }, [handleCurrentlyPlaying, spotify]);

  return (
    <GrommetHeader
      background="brand"
      pad={{ vertical: "xsmall", horizontal: "xlarge" }}
      margin={{ bottom: "large" }}
      justify="center"
      animation="fadeIn"
    >
      <Box flex align="center">
        {currentlyPlaying && (
          <Box width="100%" flex direction="row" justify="center" animation="fadeIn">
            <Text size="small" margin={{ right: "0.5em" }}>
              Now&nbsp;Playing:
            </Text>
            <Marquee size="small">
              <Text size="small">
                <strong>{currentlyPlaying.item?.name}</strong> by{" "}
                <strong>{currentlyPlaying.item?.artists.map((artist) => artist.name).join(", ")}</strong>
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
      <Nav flex align="end">
        <Button
          onClick={handleThemeModeSwitch}
          icon={themeMode === "light" ? <Sun color="brand-secondary" /> : <Moon color="brand-secondary" />}
          a11yTitle="Toggle dark mode"
        />
      </Nav>
    </GrommetHeader>
  );
};

export default forwardRef(Header);
