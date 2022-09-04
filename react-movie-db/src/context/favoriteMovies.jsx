import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

/* eslint-disable-next-line */
import PropTypes from 'prop-types';

const FavoriteMoviesContext = createContext();

const FavoriteMoviesProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const getMovies = async () => {
    const { data } = await axios.get('/api/v1/movies/getmovies');
    setFavoriteMovies(await data.favoriteMovies);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <FavoriteMoviesContext.Provider
      value={{ getMovies, favoriteMovies, setFavoriteMovies }}
    >
      {children}
    </FavoriteMoviesContext.Provider>
  );
};

FavoriteMoviesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { FavoriteMoviesContext, FavoriteMoviesProvider };
