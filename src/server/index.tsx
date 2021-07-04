import App from "client/App";
import { AuthState } from "client/atoms/auth.atom";
import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { SpotifyController } from "services/spotify";
import { ServerStyleSheet } from "styled-components";

const cssLinksFromAssets = (assets: GenericObject, entryPoint: string) => {
  return assets[entryPoint]
    ? assets[entryPoint].css
      ? assets[entryPoint].css.map((asset: string) => `<link rel="stylesheet" href="${asset}">`).join("")
      : ""
    : "";
};

const jsScriptTagsFromAssets = (assets: GenericObject, entryPoint: string, extra = "") => {
  return assets[entryPoint]
    ? assets[entryPoint].js
      ? assets[entryPoint].js.map((asset: string) => `<script src="${asset}"${extra}></script>`).join("")
      : ""
    : "";
};

const router: FastifyPluginCallback = (server: FastifyInstance, _opts, done) => {
  server
    .register(import("fastify-static"), { root: process.env.RAZZLE_PUBLIC_DIR!, wildcard: false })
    .register(import("fastify-sensible"))
    .register(import("fastify-cookie"))
    .register(import("fastify-cors"), { origin: true })
    .register(import("./api"), { prefix: "/api" })
    .all("/*", async (req, res) => {
      const assets = await import(process.env.RAZZLE_ASSETS_MANIFEST!);
      const sheets = new ServerStyleSheet();

      const initialThemeMode = req.cookies._thememode as "dark" | "light" | undefined;
      const authState = await SpotifyController.getAuthState(req.cookies);
      const authInitState: AuthState = authState && { ...authState, expiry: authState?.expiry?.toISOString() ?? null };

      if (authState?.authCode) {
        res.setCookie("_authcode", authState.authCode);
      } else {
        res.clearCookie("_authcode");
      }
      if (authState?.accessToken) {
        res.setCookie("_token", authState.accessToken, { expires: authState.expiry! });
      } else {
        res.clearCookie("_token");
      }
      if (authState?.expiry) {
        res.setCookie("_exp", authState.expiry.toISOString());
      } else {
        res.clearCookie("_exp");
      }
      if (authState?.refreshToken) {
        res.setCookie("_refreshtoken", authState.refreshToken);
      } else {
        res.clearCookie("_refreshtoken");
      }

      let styles = "";
      let markup = "";
      try {
        globalThis.__CONFIG__ = { initialThemeMode, authInitState };
        markup = renderToString(
          sheets.collectStyles(
            <StaticRouter location={req.url}>
              <App initialThemeMode={initialThemeMode} authInitState={authInitState} />
            </StaticRouter>
          )
        );
        styles = sheets.getStyleTags();
      } catch (error) {
        req.log.error(error);
        if (error.name === "SSR_REDIRECT") return res.redirect(error.message);
      } finally {
        sheets.seal();
      }
      res
        .status(200)
        .type("text/html")
        .send(
          `
        <!doctype html>
        <html lang="">
          <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charset="utf-8" />
              <title>Randomise-Spotify</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${cssLinksFromAssets(assets.default, "client")}
              ${styles}
          </head>
          <body>
              <div id="root">${markup}</div>
              ${jsScriptTagsFromAssets(assets.default, "client", " defer crossorigin")}
              <script> window.__CONFIG__ = ${JSON.stringify({ initialThemeMode, authInitState })} </script>
          </body>
        </html>
  `
        );
    });
  done();
};

export default router;
