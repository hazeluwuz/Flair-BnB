import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SpotDetailPage.css";
import { deleteSpotById } from "../../store/spots";
function SpotDetailPage() {
  const spots = useSelector((state) => Object.values(state.spots));
  const { spotId } = useParams();
  const spot = spots.find((spot) => spot.id == spotId);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  let owner = false;
  if (sessionUser) {
    owner = sessionUser.id === spot.ownerId;
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpotById(spotId));
    history.push("/");
  };

  return (
    <div className="main-spot-container">
      <div className="spot-details">
        <div className="spot-name">{spot?.name}</div>
        <div className="spot-review-details">
          <i class="fa-solid fa-star fa-xs star-icon"></i>
          {spot?.avgRating} ·
          {owner && (
            <div className="spot-button">
              <button onClick={(e) => handleDelete(e)}>DELETE</button>
            </div>
          )}
        </div>
      </div>
      <div className="spot-img-container">
        <img
          className="spot-image"
          src={
            spot?.previewImage ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
          }
        />
      </div>
      <div className="bottom-details-container">
        <div className="spot-desc">{spot?.description}</div>
        <div className="spot-detail-price-container">
          <div className="spot-detail-price">${spot?.price}</div>
          <div className="spot-detail-price-night">night</div>
          <div className="spot-detail-review-info">
            <i class="fa-solid fa-star fa-xs star-icon"></i>
            {spot?.avgRating} ·
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpotDetailPage;
