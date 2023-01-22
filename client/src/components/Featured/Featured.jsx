import React, { useCallback, useEffect, useState, memo } from 'react';
/* eslint-disable-next-line */
import PropTypes from 'prop-types';

import { fetchFeatured } from '../../utils/fetchData';
import { smallImageUrl } from '../../utils/url';
import Loading from '../Loading/Loading';
import CardList from '../CardList/CardList';

import './Featured.scss';

const Featured = memo(({ mediaType, headTitle }) => {
  const [shows, setShows] = useState([]);
  const [active, setActive] = useState('day');
  const [loading, setLoading] = useState(false);

  const toggleTrending = useCallback(
    async (timeUrl = 'day') => {
      setLoading(true);
      try {
        const res = await fetchFeatured(`trending/${mediaType}/${timeUrl}`);

        setShows(res.data.results);
        setActive(timeUrl);
      } catch (error) {
        console.error('error', error);
      } finally {
        setLoading(false);
      }
    },
    [setShows, mediaType]
  );

  useEffect(() => {
    toggleTrending();
  }, [toggleTrending]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="section-featured">
      <div className="titles">
        <h1 data-testid="header" id="headTitle">
          {headTitle}
        </h1>
        <div className="timeButtons">
          {/* eslint-disable-next-line */}
          <div
            id="btnDay"
            type="button"
            className={`${active === 'day' ? 'active' : ''}`}
            onClick={() => toggleTrending('day')}
          >
            <p>day</p>
          </div>
          {/* eslint-disable-next-line */}
          <div
            id="btnWeek"
            type="button"
            className={`${active === 'week' ? 'active' : ''}`}
            onClick={() => toggleTrending('week')}
          >
            <p>week</p>
          </div>
        </div>
      </div>
      <div className="container-featured">
        {shows.map(
          ({
            id,
            title,
            name,
            poster_path: imagePath,
            release_date: releaseDate,
            first_air_date: firstAirDate,
            vote_average: rating,
            media_type: media,
          }) => {
            const image =
              imagePath === null
                ? 'https://ctkbiotech.com/wp/wp-content/uploads/2018/03/not-available.jpg'
                : `${smallImageUrl}${imagePath}`;

            return (
              <CardList
                key={Math.random()}
                id={id}
                image={image}
                title={title || name}
                releaseDate={releaseDate || firstAirDate}
                rating={rating}
                link={`/shows/${media}/${id}`}
              />
            );
          }
        )}
      </div>
    </section>
  );
});

export default Featured;

Featured.propTypes = {
  mediaType: PropTypes.string.isRequired,
  headTitle: PropTypes.string.isRequired,
};
