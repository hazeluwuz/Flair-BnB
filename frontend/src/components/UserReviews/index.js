import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserReviews } from "../../store/reviews";
import ReviewCard from "../ReviewCard";
import "./UserReviews.css";
function UserReviews() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(getUserReviews()).then(() => setIsLoaded(true));
  }, [dispatch]);
  if (!sessionUser) return <Redirect to="/" />;
  return (
    isLoaded && (
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
    )
  );
}
export default UserReviews;
