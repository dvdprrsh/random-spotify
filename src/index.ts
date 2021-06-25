import fastify from "fastify";
import middiePlugin from "middie";
import App from "./server";

const port = process.env.PORT || 3000;

let app = App;

if (module.hot) {
  module.hot.accept("./server", async function () {
    console.log("🔁  HMR Reloading `./server`...");
    try {
      const appImport = await import("./server");
      app = appImport.default;
      start();
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}

let server: ReturnType<typeof fastify>;
const start = () => {
  if (server) server.close();
  server = fastify({
    logger: {
      name: "server",
      prettyPrint: {
        translateTime: true,
        levelFirst: true,
        colorize: true,
        crlf: true,
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
