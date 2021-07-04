import { Footer as GrommetFooter, Text } from "grommet";
import { FC } from "react";
import styled from "styled-components";

interface Props {}

const FooterContainer = styled(GrommetFooter)`
  position: sticky;
  top: 100%;
`;

const Footer: FC<Props> = () => {
  return (
    <FooterContainer flex="shrink" align="center" justify="center" fill="horizontal" pad="small" margin={{ top: "large" }} background="background!">
      <GrommetFooter width={{ width: "100%", max: "xlarge" }} justify="center" animation="fadeIn">
        <Text size="medium">Spotify-Randomise</Text>
      </GrommetFooter>
    </FooterContainer>
  );
};

export default Footer;
