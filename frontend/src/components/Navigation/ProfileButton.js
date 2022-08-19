import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import "./ProfileButton.css";
function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="session-links">
      <div className="profile-menu">
        <button onClick={openMenu}>
          <i class="fa-solid fa-bars profile-bars"></i>
          <i className="fas fa-user-circle" />
        </button>
        {showMenu && (
          <div className="profile-dropdown-container">
            <div>
              <p>{user.username}</p>
              <p>{user.email}</p>
              <button onClick={logout}>Log Out</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
