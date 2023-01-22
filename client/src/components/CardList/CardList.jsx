import React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
import PropTypes from 'prop-types';

// import LazyLoad from 'react-lazyload';

import colorPicker from '../../utils/colorPicker';

import AddFavoriteMovie from '../AddFavoriteMovie/AddFavoriteMovie';

import './CardList.scss';

const CardList = ({ id, title, image, link, releaseDate, rating, myRef }) => {
  const params = window.location.pathname;

  return (
    <>
      <div ref={myRef} className='cardList' key={id}>
        <Link to={link}>
          {/* <LazyLoad
            height={200}
            offset={100}
            resize={true}
            overflow={params !== '/' ? true : false}
          > */}
          <img src={image} alt={title} />
          {/* </LazyLoad> */}
        </Link>
        <h2 style={{ color: `${colorPicker(rating)}` }}>{rating.toFixed(1)}</h2>
        <AddFavoriteMovie
          className='favorite-movie'
          id={rating}
          titleOrName={title}
          imageUrl={image}
          link={link}
        />
        <Link to={link} className='information'>
          <h3>{title}</h3>
          <p>{releaseDate}</p>
        </Link>
      </div>
    </>
  );
};

export default CardList;

CardList.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  myRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};
