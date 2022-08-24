import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import SplashPage from "./components/SplashPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { getAllSpots } from "./store/spots";
import SpotDetailPage from "./components/SpotDetailPage";
import UserListings from "./components/UserListings";
import UserReviews from "./components/UserReviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAllSpots());
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/spots/:spotId">
            <SpotDetailPage />
          </Route>
          <Route path="/manage-listings">
            <UserListings />
          </Route>
          <Route path="/manage-reviews">
            <UserReviews />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
