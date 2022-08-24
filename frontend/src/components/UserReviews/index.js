import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviews } from "../../store/reviews";
import ReviewCard from "../ReviewCard";
import "./UserReviews.css";
function UserReviews() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));
  useEffect(() => {
    dispatch(getUserReviews());
  }, [dispatch]);
  return (
    <div className="main-user-container">
      <div className="main-user-inner-container">
        <h1 className="user-review-header">User Reviews</h1>
        <div className="user-review-container">
          <div className="user-reviews">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserReviews;
