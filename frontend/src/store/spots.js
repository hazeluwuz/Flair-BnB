import { csrfFetch } from "./csrf";
const CREATE = "spots/CREATE";
const READ = "spots/READ";
const UPDATE = "spots/UPDATE";
const DELETE = "spots/DELETE";
const READBYID = "spots/READBYID";

export const loadSpots = (spots) => {
  return {
    type: READ,
    spots,
  };
};

export const createSpot = (spot) => {
  return {
    type: CREATE,
    spot,
  };
};

export const deleteSpot = (spotId) => {
  return {
    type: DELETE,
    spotId,
  };
};

export const readSpot = (spot) => {
  return {
    type: READBYID,
    spot,
  };
};
export const getAllSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots");
  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpots(data.Spots));
  }
};

export const getSpotById = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  if (res.ok) {
    const data = await res.json();
    console.log(data);
    dispatch(readSpot(data));
  }
};

export const createNewSpot = (spotData) => async (dispatch) => {
  const reqData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(spotData),
  };
  console.log(reqData);
  const res = await csrfFetch("/api/spots", reqData);
  console.log(res);
  if (res.ok) {
    const data = await res.json();
    dispatch(getSpotById(data.id));
  }
  return res;
};

export const deleteSpotById = (spotId) => async (dispatch) => {
  const reqData = {
    method: "DELETE",
  };
  const res = await csrfFetch(`/api/spots/${spotId}`, reqData);
  if (res.ok) {
    dispatch(deleteSpot(spotId));
  }
  return res;
};
const initialState = { allSpots: {}, spotDetails: {} };
export default function spotsReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case READ:
      newState = { ...state };
      action.spots.forEach((spot) => {
        newState["allSpots"][spot.id] = spot;
      });
      return newState;
    case CREATE: {
      newState = { ...state };
      newState["allSpots"][action.spot.id] = action.spot;
      return newState;
    }
    case READBYID: {
      newState = { ...state };
      newState["spotDetails"][action.spot.id] = action.spot;
      return newState;
    }
    case DELETE: {
      newState = { ...state };
      delete newState[action.spotId];
      return newState;
    }
    default:
      return state;
  }
}
