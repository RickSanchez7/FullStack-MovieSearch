import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { NavbarProvider } from './context/navbar.context';
import { AuthButtonProvider } from './context/authButton';
import { CurrentUserProvider } from './context/current-user';

import 'bulma/css/bulma.css';
import './sass/styles.scss';
import { FavoriteMoviesProvider } from './context/favoriteMovies';

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <NavbarProvider>
        <AuthButtonProvider>
          <FavoriteMoviesProvider>
            <App />
          </FavoriteMoviesProvider>
        </AuthButtonProvider>
      </NavbarProvider>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
