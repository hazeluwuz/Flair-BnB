import { csrfFetch } from "./csrf";
const SET_USER = "/session/SET_USER";
const REMOVE_USER = "/session/REMOVE_USER";

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};
const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  if (data) {
    dispatch(setUser(data));
  }
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

const initialState = { user: null };
export default function sessionReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER: {
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    }
    case REMOVE_USER: {
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    }
    default:
      return state;
  }
}
