import { csrfFetch } from "./csrf";
import { clearReviews } from "./reviews";
const CREATE = "spots/CREATE";
const READ = "spots/READ";
const UPDATE = "spots/UPDATE";
const DELETE = "spots/DELETE";
const READBYID = "spots/READBYID";
const LOAD_USER_SPOTS = "spots/LOAD_USER_SPOTS";

export const loadSpots = (spots) => {
  return {
    type: READ,
    spots,
  };
};

export const loadUserSpots = (spots) => {
  return {
    type: LOAD_USER_SPOTS,
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

export const getUserSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");
  if (res.ok) {
    const data = await res.json();
    dispatch(loadUserSpots(data.Spots));
  }
};

export const getSpotById = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  if (res.ok) {
    const data = await res.json();
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
  const res = await csrfFetch("/api/spots", reqData);
  if (res.ok) {
    const data = await res.json();
    dispatch(getSpotById(data.id));
    return data;
  }
  return res;
};

export const editSpotById = (data, spotId) => async (dispatch) => {
  const reqData = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await csrfFetch(`/api/spots/${spotId}`, reqData);

  if (res.ok) {
    const data = await res.json();
    dispatch(getSpotById(data.id));
  }
  return res;
};

export const createImageForSpot = (imgData, spotId) => async (dispatch) => {
  const reqData = {
    method: "POST",
    body: imgData,
  };
  console.log(reqData);
  const res = await csrfFetch(`/api/spots/${spotId}/images`, reqData);
  return res;
};

export const deleteSpotById = (spotId) => async (dispatch) => {
  const reqData = {
    method: "DELETE",
  };
  const res = await csrfFetch(`/api/spots/${spotId}`, reqData);
  if (res.ok) {
    dispatch(deleteSpot(spotId));
    dispatch(clearReviews());
  }
  return res;
};

export default function spotsReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case CREATE: {
      newState = { ...state };
      newState[action.spot.id] = action.spot;
      return newState;
    }
    case READ: {
      newState = {};
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    }
    case LOAD_USER_SPOTS: {
      newState = {};
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    }
    case READBYID: {
      newState = { ...state };
      newState[action.spot.id] = {
        ...newState[action.spot.id],
        ...action.spot,
      };
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
