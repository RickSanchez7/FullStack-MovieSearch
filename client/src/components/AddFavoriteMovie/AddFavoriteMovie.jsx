import React, { useCallback, useContext, useEffect, useState } from 'react';
/* eslint-disable-next-line */
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { FavoriteMoviesContext } from '../../context/favoriteMovies';

import { CurrentUserContext } from '../../context/current-user';

import UseRequest from '../../hooks/use-request';

const AddFavoriteMovie = ({ titleOrName, imageUrl, link, ...props }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [likeMovie, setLikeMovie] = useState(false);

  const { getMovies, favoriteMovies } = useContext(FavoriteMoviesContext);

  const { currentUser } = useContext(CurrentUserContext);

  const { doRequest: doRequestPost } = UseRequest({
    url: '/api/v1/movies/addmovie',
    method: 'post',
    body: { title, image, link },
  });

  const { doRequest: doRequestDelete } = UseRequest({
    url: '/api/v1/movies/removemovie',
    method: 'post',
    body: { title, image, link },
  });

  const findMovies = useCallback(
    (titleName) => {
      if (favoriteMovies) {
        const match = favoriteMovies.find((movieTitle) => {
          return movieTitle.title === titleName;
        });

        return match;
      } else {
        return false;
      }
    },
    [favoriteMovies]
  );

  const checkMovies = useCallback(
    (titleName) => {
      if (findMovies(titleName)) {
        return setLikeMovie(true);
      }
      return setLikeMovie(false);
    },
    [findMovies]
  );

  useEffect(() => {
    setImage(imageUrl);
    setTitle(titleOrName);
  }, [imageUrl, titleOrName]);

  useEffect(() => {
    checkMovies(titleOrName);
  }, [checkMovies, titleOrName]);

  const toggleTrue = async () => {
    if (!currentUser) {
      return navigate('/signin');
    }
    await doRequestDelete();
    await getMovies();
    await checkMovies(title);
  };

  const toggleFalse = async () => {
    if (!currentUser) {
      return navigate('/signin');
    }
    await doRequestPost();
    await getMovies();
    await checkMovies(title);
  };

  return (
    <div>
      {likeMovie ? (
        <FaHeart {...props} onClick={toggleTrue} />
      ) : (
        <FaRegHeart {...props} onClick={toggleFalse} />
      )}
    </div>
  );
};

AddFavoriteMovie.propTypes = {
  titleOrName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default AddFavoriteMovie;
