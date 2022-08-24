import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSpots } from "../../store/spots";
import "./UserListings.css";
import Spotcard from "../SpotCard";

function UserListings() {
  const [isLoaded, setIsLoaded] = useState(false);
  const spots = useSelector((state) => Object.values(state.spots));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);
  return (
    isLoaded && (
      <div className="splash-page-outer-container">
        <div className="splash-page-container">
          <div className="user-spots-container">
            <h1>User Listings</h1>
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

export default UserListings;
