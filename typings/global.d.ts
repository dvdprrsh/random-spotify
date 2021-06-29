import { AuthState } from "../src/client/context/auth.context";

export declare global {
  var __CONFIG__: { initialThemeMode: "dark" | "light" | undefined; authInitState: AuthState };

  interface GenericObject<T = any> {
    [key: string]: T;
  }
}
