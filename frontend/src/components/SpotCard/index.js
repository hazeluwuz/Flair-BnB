import "./SpotCard.css";
import { Link } from "react-router-dom";
function Spotcard({ spot }) {
  return (
    <Link className="spot-container" to={`/spots/${spot?.id}`}>
      <div className="spot-container">
        <img className="spot-img" src={spot?.previewImage} />
        <div className="spot-info-container">
          <div className="spot-info">
            <div className="spot-location">{`${spot?.city}, ${spot.state}`}</div>
            <div className="spot-distance">distance???</div>
            <div className="spot-price-container">
              <div className="spot-price">
                ${spot?.price.toLocaleString("en-US")}{" "}
              </div>
              <div className="spot-night">night</div>
            </div>
          </div>
          <div className="spot-review-data">
            <div className="spot-rating">review data</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default Spotcard;
