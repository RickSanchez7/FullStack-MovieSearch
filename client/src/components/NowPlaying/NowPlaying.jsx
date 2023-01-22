import React, { useCallback, useEffect, useState } from 'react';
/* eslint-disable-next-line */
import PropTypes from 'prop-types';

import { FetchNowPlaying } from '../../utils/fetchData';
import { smallImageUrl } from '../../utils/url';
import Loading from '../Loading/Loading';
import CardList from '../CardList/CardList';

import './NowPlaying.scss';

const NowPlaying = ({ headTitle }) => {
  const [shows, setShows] = useState('');
  const [mediaType, setMediaType] = useState('movie');

  const setImagebutton = useCallback(
    async (type = 'movie', link = 'now_playing') => {
      const res = await FetchNowPlaying(type, link);
      const { data } = res;
      setShows(data);
      setMediaType(type);
    },
    [setShows, setMediaType]
  );

  useEffect(() => {
    setImagebutton();
  }, [setImagebutton]);

  if (!shows) {
    return <Loading />;
  }
  return (
    <section className="section-nowPlaying">
      <div className="titles">
        <h1>{headTitle}</h1>
        <div className="timeButtons">
          {/* eslint-disable-next-line */}
          <div
            type="button"
            className={`${mediaType === 'movie' ? 'active' : ''}`}
            onClick={() => setImagebutton('movie', 'now_playing')}
          >
            <p>movie</p>
          </div>
          {/* eslint-disable-next-line */}
          <div
            type="button"
            className={`${mediaType === 'tv' ? 'active' : ''}`}
            onClick={() => setImagebutton('tv', 'on_the_air')}
          >
            <p>tv</p>
          </div>
        </div>
      </div>
      <div className="container-nowPlaying">
        {shows.results.map(
          ({
            id,
            title,
            name,
            poster_path: imagePath,
            release_date: releaseDate,
            first_air_date: firstAirDate,
            vote_average: rating,
          }) => {
            const image =
              imagePath === null
                ? 'https://ctkbiotech.com/wp/wp-content/uploads/2018/03/not-available.jpg'
                : `${smallImageUrl}${imagePath}`;

            return (
              // <Link
              //   to={`/shows/${mediaType}/${id}`}
              //   className="nowPlaying"
              //   key={id}
              // >
              //   <img src={image} alt={name} />
              //   <h3>{title || name}</h3>
              //   <div className="information">
              //     <h2 style={{ color: `${colorPicker(rating)}` }}>{rating}</h2>
              //     <p>{releaseDate || firstAirDate}</p>
              //   </div>
              // </Link>
              <CardList
                key={id}
                id={id}
                image={image}
                title={title || name}
                releaseDate={releaseDate || firstAirDate}
                rating={rating}
                link={`/shows/${mediaType}/${id}`}
              />
            );
          }
        )}
      </div>
    </section>
  );
};

export default NowPlaying;

NowPlaying.propTypes = {
  headTitle: PropTypes.string.isRequired,
};
