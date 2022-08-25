import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    history.push("/");
  };

  /*
TODO:
  - use same ProfileButton Component to render both Login/Signup links.
*/
  return (
    <div className="session-links">
      <div className="profile-menu">
        <button onClick={openMenu}>
          <i class="fa-solid fa-bars profile-bars fa-lg"></i>
          <i className="fas fa-user-circle fa-2xl" />
        </button>
        {showMenu && (
          <div className="profile-dropdown-container">
            <div className="dropdown-items-container">
              <div className="profile-email">{user.email}</div>
              <div
                className="profile-manage-reviews"
                onClick={() => history.push("/manage-listings")}
              >
                Manage Listings
              </div>
              <div
                className="profile-manage-reviews"
                onClick={() => history.push("/manage-reviews")}
              >
                Manage Reviews
              </div>
              <div className="profile-log-out" onClick={logout}>
                Log Out
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
