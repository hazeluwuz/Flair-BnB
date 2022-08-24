import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SpotDetailPage.css";
import { deleteSpotById, getSpotById } from "../../store/spots";
import { useEffect } from "react";
import SpotEditModal from "../SpotEditModal";
import { getReviewsBySpotId } from "../../store/reviews";
import ReviewCard from "../ReviewCard";
import ReviewFormModal from "../ReviewFormModal";
function SpotDetailPage() {
  const spots = useSelector((state) => Object.values(state.spots));
  const reviews = useSelector((state) => Object.values(state.reviews));
  const { spotId } = useParams();
  const spot = spots.find((spot) => spot.id == spotId);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  let owner = false;
  useEffect(() => {
    dispatch(getSpotById(spotId));
    dispatch(getReviewsBySpotId(spotId));
  }, []);

  if (sessionUser && spot) {
    owner = sessionUser.id === spot.ownerId;
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpotById(spotId));
    history.push("/");
  };

  return (
    <div className="main-spot-outer-container center">
      <div className="main-spot-container">
        <div className="main-spot-inner-container">
          <div className="spot-details">
            <div className="spot-name">{spot?.name}</div>
            <div className="spot-review-details">
              <div className="spot-review-details-container">
                <i class="fa-solid fa-star fa-xs star-icon"></i>
                {spot?.avgRating} ·
                <div className="spot-num-reviews">
                  {spot?.numReviews} reviews
                </div>
                ·
                <div className="spot-location">
                  {spot?.city}, {spot?.state}, {spot?.country}
                </div>
              </div>
              {owner && (
                <div className="spot-button">
                  <SpotEditModal spot={spot} />
                  <button onClick={(e) => handleDelete(e)}>Delete</button>
                </div>
              )}
            </div>
          </div>
          <div className="spot-img-container">
            <div className="spot-img-grid">
              <div className="spot-first-image">
                {spot?.Images && (
                  <img
                    className="spot-image"
                    src={
                      spot?.Images[0]?.url ||
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                    }
                  />
                )}
              </div>
              <div class="spot-preview-images">
                <div className="preview-containers">
                  <div className="spot-preview-image">
                    {spot?.Images && (
                      <img
                        className="preview-images"
                        src={
                          spot?.Images[1]?.url ||
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                        }
                      />
                    )}
                  </div>
                  <div className="spot-preview-image">
                    {spot?.Images && (
                      <img
                        className="preview-images"
                        src={
                          spot?.Images[3]?.url ||
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                        }
                      />
                    )}
                  </div>
                </div>
                <div className="preview-containers">
                  <div className="spot-preview-image">
                    {spot?.Images && (
                      <img
                        className="preview-images round-top-right"
                        src={
                          spot?.Images[2]?.url ||
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                        }
                      />
                    )}
                  </div>

                  <div className="spot-preview-image">
                    {spot?.Images && (
                      <img
                        className="preview-images round-bottom-right"
                        src={
                          spot?.Images[4]?.url ||
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-details-container">
            <div className="spot-desc">{spot?.description}</div>
            <div className="spot-detail-price-container">
              <div className="spot-detail-price-inner-container">
                <div className="spot-detail-price">
                  ${spot?.price.toLocaleString("en-US")}
                </div>
                <div className="spot-detail-price-night">night</div>
              </div>
              <div className="spot-detail-review-info">
                <i class="fa-solid fa-star fa-xs star-icon"></i>
                {spot?.avgRating} · {spot?.numReviews} reviews
              </div>
            </div>
          </div>
          <div className="spot-review-container">
            <div className="spot-review-container-data">
              <div>
                <i class="fa-solid fa-star fa-sm star-icon"></i>
                {spot?.avgRating} · {spot?.numReviews} reviews
              </div>
              <div className="spot-create-review">
                {sessionUser && <ReviewFormModal spotId={spotId} />}
              </div>
            </div>
            <div className="spot-reviews">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpotDetailPage;
