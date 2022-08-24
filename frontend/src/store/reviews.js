import { csrfFetch } from "./csrf";
import { getSpotById } from "./spots";
const CREATE = "reviews/CREATE";
const READ = "reviews/READ";
const UPDATE = "reviews/UPDATE";
const DELETE = "reviews/DELETE";
const READBYID = "reviews/READBYID";
const CLEAR = "reviews/CLEAR";

export const loadReviews = (reviews) => {
  return {
    type: READ,
    reviews,
  };
};
export const clearReviews = () => {
  return { type: CLEAR };
};
export const createReview = (review) => {
  return {
    type: CREATE,
    review,
  };
};
export const deleteReview = (reviewId) => {
  return {
    type: DELETE,
    reviewId,
  };
};
export const getReviewsBySpotId = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadReviews(data.Reviews));
  }
};

export const deleteReviewById = (reviewId, spotId) => async (dispatch) => {
  const reqData = {
    method: "DELETE",
  };
  const res = await csrfFetch(`/api/reviews/${reviewId}`, reqData);
  if (res.ok) {
    dispatch(deleteReview(reviewId));
    dispatch(getSpotById(spotId));
  }
  return res;
};

export const createNewReview = (reviewData, spotId) => async (dispatch) => {
  const reqData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reviewData),
  };
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, reqData);
  if (res.ok) {
    const data = await res.json();
    dispatch(createReview(data));
    dispatch(getSpotById(data.spotId));
    dispatch(getReviewsBySpotId(data.spotId));
  }
  return res;
};

export default function reviewsReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case READ: {
      newState = {};
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    }
    case CREATE: {
      newState = { ...state };
      newState[action.review.id] = action.review;
      return newState;
    }
    case DELETE: {
      newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    case CLEAR: {
      return {};
    }
    default:
      return state;
  }
}
