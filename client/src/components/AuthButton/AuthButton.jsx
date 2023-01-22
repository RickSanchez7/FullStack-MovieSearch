import React, { useContext, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GoTriangleDown } from 'react-icons/go';

import { CurrentUserContext } from '../../context/current-user';
import { AuthButtonContext } from '../../context/authButton';
import { NavbarContext } from '../../context/navbar.context';
import { FavoriteMoviesContext } from '../../context/favoriteMovies';

import './AuthButton.scss';

const AuthButton = () => {
  const navigate = useNavigate();
  const { currentUser, signout, profile } = useContext(CurrentUserContext);

  const { setFavoriteMovies } = useContext(FavoriteMoviesContext);

  const { closeNavbar } = useContext(NavbarContext);
  const { closeAuthButton, toggleAuthButton, stateAuth } =
    useContext(AuthButtonContext);

  const activeAuth = stateAuth.showAuthLinks ? 'activeAuth' : '';

  const spinArrow = stateAuth.showAuthLinks ? 'spin' : '';

  const toggleButtons = () => {
    toggleAuthButton();
    closeNavbar();
  };

  const signoutButton = () => {
    signout();
    setFavoriteMovies([]);
    closeNavbar();
    closeAuthButton();
    // change page if in profile page when sign out
    if (window.location.pathname === '/profile') {
      navigate('/');
    }
  };

  const profileButton = () => {
    closeAuthButton();
    closeNavbar();
  };

  // Close dropdown when clicking outside
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          closeAuthButton();
        }
      };

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className="auth-container" ref={wrapperRef}>
      {!currentUser || !profile ? (
        <NavLink
          className={({ isActive }) => `auth-button ${isActive && 'selected'}`}
          to="/signin"
        >
          Sign In
        </NavLink>
      ) : (
        <button type="button" className="auth-button" onClick={toggleButtons}>
          Hi
          <div className="profile-name">{profile.name}</div>
          <div className={`triangules ${spinArrow}`}>
            <GoTriangleDown />
          </div>
        </button>
      )}

      <div className={`auth-links ${activeAuth}`}>
        <NavLink onClick={profileButton} className="profile-link" to="/profile">
          Profile
        </NavLink>
        <button
          onClick={signoutButton}
          type="button"
          className="signout-button"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default AuthButton;
