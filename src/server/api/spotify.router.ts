import { FastifyPluginCallback } from "fastify";
import { SpotifyController } from "services/spotify";

const spotifyRouter: FastifyPluginCallback = (server, _opts, done) => {
  server.get<{ Querystring: { authcode: string } }>("/access-token", async (req, res) => {
    const authCodeRes = await SpotifyController.getAccessToken(req.cookies._authcode);
    res.status(201).send(authCodeRes);
  });
  done();
};

export default spotifyRouter;
