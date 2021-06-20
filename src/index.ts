import Fastify from "fastify";
import middiePlugin from "middie";
import App from "./server";

let app = App;

if (module.hot) {
  module.hot.accept("./server", function () {
    console.log("🔁  HMR Reloading `./server`...");
    try {
      app = require("./server");
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}

const port = process.env.PORT || 3000;

export default Fastify({
  logger: {
    name: "server",
    prettyPrint: {
      translateTime: true,
      levelFirst: true,
      colorize: true,
      crlf: true,
    },
  },
})
  .register(middiePlugin)
  .register(app)
  .listen(port, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
  });
