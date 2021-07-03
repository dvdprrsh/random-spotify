import { AuthState } from "client/atoms/auth.atom";

declare global {
  // eslint-disable-next-line no-var
  var __CONFIG__: { initialThemeMode: "dark" | "light" | undefined; authInitState: AuthState };

  interface GenericObject<T = any> {
    [key: string]: T;
  }
}
