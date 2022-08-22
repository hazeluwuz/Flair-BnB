import { useSelector } from "react-redux";

import Spotcard from "../SpotCard";
import "./SplashPage.css";
function SplashPage() {
  const spots = useSelector((state) => Object.values(state.spots));
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
