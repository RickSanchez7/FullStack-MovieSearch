import React, { useContext, memo } from 'react';
import { NavLink } from 'react-router-dom';
// import LazyLoad from 'react-lazyload';

import { FavoriteMoviesContext } from '../../context/favoriteMovies';
import Loading from '../Loading/Loading';

import './FavoriteMoviesList.scss';

const FavoriteMoviesList = memo(() => {
  const { favoriteMovies } = useContext(FavoriteMoviesContext);

  if (!favoriteMovies) return <Loading />;

  const moviesLength = favoriteMovies.length === 0 ? '' : 'scrollList';

  return (
    <div className='favorite-movies-container'>
      <h1 className='favorite-movies-title'>Favorite Movies</h1>
      <div className={`favorite-movie-list ${moviesLength}`}>
        {favoriteMovies.length === 0 ? (
          <p>Add movies to the list</p>
        ) : (
          favoriteMovies.map(movie => {
            return (
              <div className='box' key={Math.random()}>
                <article className='media'>
                  <div className='media-left'>
                    <figure className='image'>
                      {/* <LazyLoad
                        height={200}
                        offset={300}
                        // resize={true}
                        overflow={true}
                        scroll
                        once
                      > */}
                      <NavLink to={movie.link}>
                        <img src={movie.image} alt={movie.title} />
                      </NavLink>
                      {/* </LazyLoad> */}
                    </figure>
                  </div>
                  <div className='media-content'>
                    <div className='content'>
                      <NavLink to={movie.link}>
                        <h1>{movie.title}</h1>
                      </NavLink>
                    </div>
                  </div>
                </article>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
});

export default FavoriteMoviesList;
