import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./ReviewEdit.css";
import { createNewReview, editReview } from "../../store/reviews";

function ReviewEdit({ curReview }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [review, setReview] = useState(curReview.review || "");
  const [stars, setStars] = useState(curReview.stars || "");
  const [errors, setErrors] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      review,
      stars,
    };
    if (review.length >= 256) {
      setErrors({ review: "Review must be less than 255 Characters!" });
    }
    if (review.length <= 255) {
      setErrors([]);
      const review = dispatch(editReview(data, curReview.id)).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="review_error">
        {Object.values(errors).map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className="review-input-item">
        <input
          className="hide-scroll"
          placeholder=" "
          type="text"
          id="review-description"
          maxlength="255"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
        <label>Review Description</label>
      </div>
      <div className="review-input-item">
        <input
          className="number-input"
          placeholder=" "
          type="number"
          min="1"
          max="5"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
        />
        <label>Rating (1-5)</label>
      </div>
      <button className="review-modal-submit" type="submit">
        Edit Review
      </button>
    </form>
  );
}

export default ReviewEdit;
