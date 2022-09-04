import React, { useReducer, createContext } from 'react';

import navbarReducer from './useReducer/navbar/navbar-reducer';
import { TOGGLE, CLOSE } from './useReducer/navbar/navbar-actions';

const NavbarContext = createContext();

const NavbarProvider = ({ children }) => {
  const initialState = {
    showLinks: false,
  };

  const [state, dispatch] = useReducer(navbarReducer, initialState);

  const closeNavbar = () => {
    dispatch({
      type: CLOSE,
    });
  };

  const toggleNavbar = () => {
    dispatch({
      type: TOGGLE,
    });
  };

  return (
    <NavbarContext.Provider value={{ toggleNavbar, closeNavbar, state }}>
      {children}
    </NavbarContext.Provider>
  );
};

export { NavbarProvider, NavbarContext };
