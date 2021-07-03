import { FastifyPluginCallback } from "fastify";
import { SpotifyController } from "services/spotify";

const spotifyRouter: FastifyPluginCallback = (server, _opts, done) => {
  server.get<{ Querystring: { authcode: string } }>("/access-token", async (req, res) => {
    try {
      const authCodeRes = await SpotifyController.getAccessToken(req.query.authcode);
      res.status(201).send(authCodeRes);
    } catch (error) {
      console.error(error);
      res.internalServerError();
    }
  });
  done();
};

export default spotifyRouter;
