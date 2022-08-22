import { csrfFetch } from "./csrf";
const CREATE = "spots/CREATE";
const READ = "spots/READ";
const UPDATE = "spots/UPDATE";
const DELETE = "spots/DELETE";
const READBYID = "spots/READBYID";

export const loadReviews = (reviews) => {
  return {
    type: READ,
    reviews,
  };
};

export const getReviewBySpotId = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadReviews(reviews));
  }
};

export default function spotsReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case READ: {
      newState = {};
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    }
    default:
      return state;
  }
}
