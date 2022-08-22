import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SpotDetailPage.css";
function SpotDetailPage() {
  const spots = useSelector((state) => Object.values(state.spots));
  const { spotId } = useParams();
  const spot = spots.find((spot) => spot.id == spotId);
  return (
    <div className="main-spot-container">
      <div className="spot-details">
        <div className="spot-name">{spot?.name}</div>
        <div className="spot-review-details">
          <i class="fa-solid fa-star fa-xs star-icon"></i>
          {spot?.avgRating} ·
        </div>
      </div>
      <div className="spot-img-container">
        <img className="spot-image" src={spot?.previewImage} />
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
