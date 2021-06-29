import { getDecryptedValues } from "ciphenv";
import dotenv from "dotenv";

export const ORIGIN = process.env.ORIGIN || `http://localhost:${process.env.PORT}`;
export const SPOTIFY_WEB_PLAYBACK_SCOPES = [
  "playlist-read-private",
  "streaming",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-email",
  "user-read-playback-state",
  "user-read-private",
];

export const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = getDecryptedValues(process.env.CIPHENV_SECRET, {
  ...process.env,
  ...dotenv.config({ path: `.env.${process.env.NODE_ENV}` }).parsed,
});
