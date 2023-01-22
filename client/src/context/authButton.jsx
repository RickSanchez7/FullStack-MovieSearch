import React, { useReducer, createContext } from 'react';

import {
  CLOSE_AUTH,
  TOGGLE_AUTH,
} from './useReducer/authButton/authButton-actions';

import authButtonReducer from './useReducer/authButton/authButton-reducer';

const AuthButtonContext = createContext();

const AuthButtonProvider = ({ children }) => {
  const initialState = {
    showAuthLinks: false,
  };

  const [stateAuth, dispatch] = useReducer(authButtonReducer, initialState);

  const closeAuthButton = () => {
    dispatch({
      type: CLOSE_AUTH,
    });
  };

  const toggleAuthButton = () => {
    dispatch({
      type: TOGGLE_AUTH,
    });
  };

  return (
    <AuthButtonContext.Provider
      value={{ closeAuthButton, toggleAuthButton, stateAuth }}
    >
      {children}
    </AuthButtonContext.Provider>
  );
};

export { AuthButtonProvider, AuthButtonContext };
