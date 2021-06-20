import type { LoggerOptions } from "pino";

declare module "fastify" {
  interface FastifyLoggerOptions extends LoggerOptions {}
}
