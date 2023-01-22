import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthButtonContext } from '../../context/authButton';

import { NavbarContext } from '../../context/navbar.context';
import AuthButton from '../AuthButton/AuthButton';

import './Navbar.scss';

const Navbar = () => {
  // toggle or close navbar in mobile
  const { toggleNavbar, closeNavbar, state } = useContext(NavbarContext);

  const { closeAuthButton } = useContext(AuthButtonContext);

  const active = state.showLinks ? 'active' : '';

  const navLinkButton = () => {
    closeAuthButton();
    closeNavbar();
  };

  return (
    <header className='header'>
      <div className='nav'>
        <div className='nav-title'>React Movie DB</div>
        <div className={`nav-links ${active}`}>
          <NavLink
            exact='true'
            to='/'
            className={({ isActive }) => `${isActive && 'selected'}`}
            onClick={navLinkButton}
          >
            Home
          </NavLink>
          <NavLink
            to='/movies'
            className={({ isActive }) => `${isActive && 'selected'}`}
            onClick={navLinkButton}
          >
            Movies
          </NavLink>
          <NavLink
            to='/tv'
            className={({ isActive }) => `${isActive && 'selected'}`}
            onClick={navLinkButton}
          >
            tv shows
          </NavLink>
        </div>
      </div>
      <AuthButton />

      {/* eslint-disable-next-line */}
      <div className='btn-nav' onClick={toggleNavbar}>
        <span className={`hamburger ${active}`}>&nbsp;</span>
      </div>
    </header>
  );
};

export default Navbar;
