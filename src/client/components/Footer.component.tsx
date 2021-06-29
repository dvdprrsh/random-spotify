import { Footer as GrommetFooter, Text } from "grommet";
import { FC } from "react";
import styled from "styled-components";

interface Props {}

const MyFooter = styled(GrommetFooter)`
  position: sticky;
  top: 100%;
`;

const Footer: FC<Props> = () => {
  return (
    <MyFooter
      background="background!"
      pad={{ vertical: "small", horizontal: "xlarge" }}
      margin={{ top: "large" }}
      justify="center"
      animation="fadeIn"
    >
      <Text size="medium">Spotify-Randomise</Text>
    </MyFooter>
  );
};

export default Footer;
