import { FastifyPluginCallback } from "fastify";
import authenticationRouter from "./authentication.router";

const publicRouter: FastifyPluginCallback = (server, _opts, done) => {
  server.register(authenticationRouter, { prefix: "/authentication" });
  done();
};

export default publicRouter;
