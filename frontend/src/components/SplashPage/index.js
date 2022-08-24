import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";

import Spotcard from "../SpotCard";
import "./SplashPage.css";
function SplashPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const spots = useSelector((state) => Object.values(state.spots));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    isLoaded && (
      <div className="splash-page-outer-container">
        <div className="splash-page-container">
          <div className="spots-container">
            <div className="spots-inner-container">
              <div className="spots-grid">
                {spots.map((spot) => (
                  <Spotcard key={spot?.id} spot={spot} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default SplashPage;
