import { useDispatch, useSelector } from "react-redux";
import { deleteReviewById } from "../../store/reviews";
import DeleteModal from "../DeleteModal";
import ReviewEditModal from "../ReviewEditModal";
import "./ReviewCard.css";
function ReviewCard({ review }) {
  const dispatch = useDispatch();
  const createdAt = review?.createdAt;
  let date;
  if (createdAt) {
    date = new Date(createdAt).toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  }
  let owner;
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser && review) {
    owner = sessionUser.id === review.userId;
  }
  const handleDelete = () => {
    dispatch(deleteReviewById(review.id, review.spotId));
  };
  return (
    <div className="review-card-container">
      <div className="review-user-data">
        <div className="review-user-inner-container">
          <div className="review-user-picture">
            <i className="fas fa-user-circle fa-2xl" />
          </div>
          <div className="review-user-name-date">
            <div className="review-user-name">{review?.User?.firstName}</div>
            <div className="review-date">{date}</div>
          </div>
        </div>
        <div className="review-delete">
          {owner && (
            <>
              <ReviewEditModal curReview={review} />
              <DeleteModal item={{ type: "review", data: review }} />
            </>
          )}
        </div>
      </div>
      <div className="review-data">
        <div className="review">{review?.review}</div>
      </div>
      {/* <div className="review.stars">{review?.stars}</div> */}
    </div>
  );
}

export default ReviewCard;
