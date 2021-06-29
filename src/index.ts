import fastify from "fastify";
import middiePlugin from "middie";
import App from "server";

const port = process.env.PORT || 3000;

let app = App;

if (module.hot) {
  module.hot.accept("./server", async function () {
    console.log("🔁  HMR Reloading `./server`...");
    try {
      const appImport = await import("./server");
      app = appImport.default;
      await start();
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}

let server: ReturnType<typeof fastify>;
const start = async () => {
  if (server) await server.close();
  server = fastify({
    logger: {
      name: "server",
      serializers: {
        req(req) {
          return {
            method: req.method,
            url: req.url,
            direction: "~~>",
          };
        },
        res(res) {
          return {
            method: res.request.method,
            url: res.request.url,
            statusCode: res.statusCode,
            responseTime: Math.round(res.getResponseTime() * 100) / 100 + "ms",
            direction: "<~~",
          };
        },
      },
      prettyPrint: {
        translateTime: true,
        levelFirst: true,
        colorize: true,
        messageFormat: "{req.direction}{res.direction} ({reqId}) [{req.method}{res.method}] {req.url}{res.url} {res.statusCode} {res.responseTime}",
        ignore: "reqId,req,res,responseTime",
      },
    },
  });
  server
    .register(middiePlugin)
    .register(app)
    .listen(port, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`✅ Started on port ${port}`);
    });
};

start();
