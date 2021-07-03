import { FastifyPluginCallback } from "fastify";
import { SpotifyController } from "services/spotify";

const authenticationRouter: FastifyPluginCallback = (server, _opts, done) => {
  server.get("/", (_req, res) => {
    const authRedirectURL = SpotifyController.getAuthorisationURL();
    res.status(200).send(authRedirectURL);
  });
  done();
};

export default authenticationRouter;
