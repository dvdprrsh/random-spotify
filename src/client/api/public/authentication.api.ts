import superagent from "superagent";
import prefix from "superagent-prefix";

const authenticationAPI = superagent.agent().use(prefix("/api/public/authentication"));

export const login = async (): Promise<string | undefined> => {
  try {
    const res = await authenticationAPI.get("/");
    return res.text;
  } catch (error) {
    console.error(error);
  }
};

export * as AuthenticationAPI from "./authentication.api";
