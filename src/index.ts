import fastify from "fastify";

const port = process.env.PORT || 3000;

const start = () => {
  fastify({
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
  })
    .register(import("server"))
    .listen(port, function (err) {
      if (err) console.error(err);
      else console.log(`✅ Started on port ${port}`);
    });
};

start();

if (module.hot) {
  module.hot.accept("./server", function () {
    console.log("🔁  HMR Reloading `./server`...");
    try {
      console.log("here");
      start();
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}
