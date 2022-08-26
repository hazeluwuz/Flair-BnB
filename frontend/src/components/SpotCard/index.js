import "./SpotCard.css";
import { Link } from "react-router-dom";
function Spotcard({ spot }) {
  return (
    <Link className="spot-container" to={`/spots/${spot?.id}`}>
      <div className="spot-container">
        <div className="spot-image-container">
          <img
            className="spot-img"
            src={
              spot?.previewImage ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
            }
            onError={(e) => (e.target.style.visibility = "hidden")}
          />
        </div>
        <div className="spot-info-container">
          <div className="spot-card-info contain-text">
            <div className="spot-card-location contain-text">{`${spot?.city}, ${spot?.state}`}</div>
            <div className="spot-price-container">
              <div className="spot-price">
                ${spot?.price.toLocaleString("en-US")}
              </div>
              <div className="spot-night">night</div>
            </div>
          </div>
          <div className="spot-review-data">
            <div className="spot-star">
              <i className="fa-solid fa-star fa-xs"></i>
            </div>
            <div className="spot-rating">{spot?.avgRating}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default Spotcard;
