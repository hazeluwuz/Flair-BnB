import { csrfFetch } from "./csrf";
const CREATE = "spots/CREATE";
const READ = "spots/READ";
const UPDATE = "spots/UPDATE";
const DELETE = "spots/DELETE";

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
    dispatch(createSpot(data));
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
};

export const deleteSpotById = (spotId) => async (dispatch) => {
  const reqData = {
    method: "DELETE",
  };
  const res = await csrfFetch(`/api/spots/${spotId}`, reqData);
  if (res.ok) {
    dispatch(deleteSpot(spotId));
  }
};

export default function spotsReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case READ:
      newState = {};
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    case CREATE: {
      newState = { ...state };
      newState[action.spot.id] = action.spot;
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
