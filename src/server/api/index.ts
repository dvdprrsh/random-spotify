import { FastifyPluginCallback } from "fastify";
import publicRouter from "./public";
import spotifyRouter from "./spotify.router";

const apiRouter: FastifyPluginCallback = (server, _opts, done) => {
  server.register(publicRouter, { prefix: "/public" }).register(spotifyRouter, { prefix: "/spotify" });
  done();
};

export default apiRouter;
