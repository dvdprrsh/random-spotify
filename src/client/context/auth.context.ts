import { Action, createContainer, createHook, createStore } from "react-sweet-state";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

type AuthActions = typeof actions;

const actions = {
  onInit:
    (): Action<AuthState, { initial: AuthState }> =>
    ({ setState }, { initial }) =>
      setState(initial),
  setAccessToken:
    (accessToken: string, refreshToken: string): Action<AuthState> =>
    ({ setState, getState }) =>
      setState({ ...getState(), accessToken, refreshToken }),
  setState:
    (state: AuthState): Action<AuthState> =>
    ({ setState }) =>
      setState(state),
  clearState:
    (): Action<AuthState> =>
    ({ setState }) =>
      setState({}),
};

const Store = createStore<AuthState, AuthActions>({
  initialState: globalThis.__CONFIG__?.authInitState ?? {
    accessToken: null,
    refreshToken: null,
  },
  actions,
  name: "AuthContext",
});

const useAuthContext = createHook(Store);

export const AuthContextContainer = createContainer<AuthState, AuthActions, { initial: AuthState }>(Store);

export default useAuthContext;
