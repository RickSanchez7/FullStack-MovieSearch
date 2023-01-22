import React, { useCallback, useEffect, useState } from 'react';
/* eslint-disable-next-line */
import PropTypes from 'prop-types';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import LazyLoad from 'react-lazyload';

import { FetchRecommendations } from '../../utils/fetchData';
import { smallImageUrl } from '../../utils/url';
import Loading from '../Loading/Loading';

import './Carousel.scss';

const Carousel = ({ mediaType, id }) => {
  const [shows, setShows] = useState('');
  const [index, setIndex] = useState(0);

  const toggleTrending = useCallback(
    async (page = '1') => {
      const res = await FetchRecommendations(mediaType, page, id);
      const { data } = res;
      setShows(data);
    },
    [setShows, id, mediaType]
  );

  useEffect(() => {
    toggleTrending();
  }, [toggleTrending]);

  useEffect(() => {
    if (shows.results) {
      const lastIndex = shows.results.length - 1;
      if (index < 0) {
        setIndex(lastIndex);
      }
      if (index > lastIndex) {
        setIndex(0);
      }
    }
  }, [index, shows.results]);

  useEffect(() => {
    const slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  if (!shows) {
    return <Loading />;
  }

  return (
    <section className='section-carousel'>
      <h1>Recommended</h1>
      <div className='section-center'>
        {shows.results.map((show, showIndex) => {
          const { id: showId, backdrop_path: imagePath, title, name } = show;
          const image =
            imagePath === null
              ? 'https://ctkbiotech.com/wp/wp-content/uploads/2018/03/not-available.jpg'
              : `${smallImageUrl}${imagePath}`;

          let position = 'nextSlide';
          if (showIndex === index) {
            position = 'activeSlide';
          }
          if (
            showIndex === index - 1 ||
            (index === 0 && showIndex === shows.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <div className={`article ${position}`} key={showId}>
              <Link to={`/shows/${mediaType}/${showId}`}>
                {/* <LazyLoad height={500} offset={100} resize={true}> */}
                <img src={image} alt={title} className={`show-img `} />
                {/* </LazyLoad> */}
                <p className={`title `}>{title || name}</p>
              </Link>
            </div>
          );
        })}
        <button
          type='button'
          className='prev'
          onClick={() => setIndex(index - 1)}
        >
          <FaArrowLeft />
        </button>
        <button
          type='button'
          className='next'
          onClick={() => setIndex(index + 1)}
        >
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Carousel;

Carousel.propTypes = {
  mediaType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
