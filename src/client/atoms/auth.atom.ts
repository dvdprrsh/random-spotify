import Cookies from "js-cookie";
import { atom, DefaultValue, selector } from "recoil";

export interface BaseAuthState {
  authCode: string;
  accessToken: string | null;
  refreshToken: string | null;
  expiry: string | null;
}
export type AuthState = BaseAuthState | null;

const authAtom = atom<AuthState>({
  key: "Auth",
  default: null,
});

const authState = selector<AuthState>({
  key: "AuthSelector",
  get({ get }) {
    return get(authAtom);
  },
  set({ set }, val) {
    if (!val) return;
    if (val instanceof DefaultValue) {
      Cookies.remove("_authcode");
      Cookies.remove("_token");
      Cookies.remove("_refreshtoken");
      Cookies.remove("_exp");
    } else {
      Cookies.set("_authcode", val.authCode);
      if (val.accessToken) Cookies.set("_token", val.accessToken);
      if (val.refreshToken) Cookies.set("_refreshtoken", val.refreshToken);
      if (val.expiry) Cookies.set("_exp", val.expiry);
    }
    set(authAtom, val);
  },
});

export default authState;
