import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { history } from "../App";

const totalReducer = combineReducers({
  promise: promiseReducer,
  auth: localStoredReducer(authReducer, "auth"),
  feed: localStoredReducer(feedReducer, "feed"),
});

export const store = createStore(totalReducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

//jwtDecode:
const jwtDecode = (token) => {
  try {
    let payload = JSON.parse(atob(token.split(".")[1]));
    console.log(payload);
    return payload;
  } catch (e) {
    return undefined;
  }
};

//promiseReducer:
function promiseReducer(state = {}, { type, status, payload, error, name }) {
  if (type === "PROMISE") {
    return {
      ...state,
      [name]: { status, payload, error },
    };
  }
  return state;
}

//authReducer:
function authReducer(state = {}, { type, token }) {
  if (type === "AUTH_LOGOUT") {
    window.localStorage.removeItem("authToken");
    history.push("/");
    return {};
  }
  if (type === "AUTH_LOGIN") {
    try {
      window.localStorage.setItem("authToken", token);
      return {
        token: token,
        payload: jwtDecode(token),
      };
    } catch (e) {}
  }
  return state;
}

//changeReducer:
function feedReducer(state = {}, { type, payload }) {
  if (type === "FEED_ADD") {
    return {
      ...state,
      ...payload,
    };
  }
  if (type === "FEED_DEL") {
    return {};
  }
  return state;
}

//localStoredReducer:
function localStoredReducer(originalReducer, localStorageKey) {
  function wrapper(state, action) {
    if (!state) {
      try {
        return JSON.parse(localStorage[localStorageKey]);
      } catch {}
    }
    let res = originalReducer(state, action);
    localStorage[localStorageKey] = JSON.stringify(res);
    return res;
  }
  return wrapper;
}
