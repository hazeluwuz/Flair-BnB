import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";

import Spotcard from "../SpotCard";
import "./SplashPage.css";
function SplashPage() {
  const spots = useSelector((state) => Object.values(state.spots.allSpots));
  const dispatch = useDispatch();

  return (
    <div className="splash-page-container">
      <div className="spots-container">
        <div className="spots-grid">
          {spots.map((spot) => (
            <Spotcard key={spot?.id} spot={spot} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
