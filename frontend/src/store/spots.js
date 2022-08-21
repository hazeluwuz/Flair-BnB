import { csrfFetch } from "./csrf";
const CREATE = "spots/CREATE";
const READ = "spots/READ";
const UPDATE = "spots/UPDATE";
const DESTROY = "spots/DESTROY";

export const loadSpots = (spots) => {
  return {
    type: READ,
    spots,
  };
};

export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpots(data.Spots));
  }
};

export default function sessionReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case READ:
      newState = { ...state };
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    default:
      return state;
  }
}
