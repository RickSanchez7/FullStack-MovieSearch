import React, { useCallback, useEffect, useState, memo, useRef } from 'react';
/* eslint-disable-next-line */
import PropTypes from 'prop-types';

import { FetchPopulars } from '../../utils/fetchData';
import { smallImageUrl } from '../../utils/url';
import Loading from '../Loading/Loading';
import CardList from '../CardList/CardList';

import './Popular.scss';

const Popular = memo(({ containerTitle, media, whatKind, myRef }) => {
  const observer = useRef();
  const mediaTypeRef = useRef();
  const pageNumberRef = useRef(1);
  const whatKindRef = useRef();
  const [shows, setShows] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const setImagebutton = useCallback(async () => {
    setLoading(true);
    try {
      let res;
      if (mediaTypeRef.current && mediaTypeRef.current !== media) {
        setPageNumber(0);
        pageNumberRef.current = 0;
        res = await FetchPopulars(media, 1, whatKind);
      } else if (whatKindRef.current && whatKindRef.current !== whatKind) {
        setPageNumber(0);
        pageNumberRef.current = 0;
        res = await FetchPopulars(media, 1, whatKind);
      } else {
        res = await FetchPopulars(media, pageNumber, whatKind);
      }
      const data = res.data.results;
      if (!mediaTypeRef.current) {
        mediaTypeRef.current = media;
        setShows(data);
      }
      if (mediaTypeRef.current !== media) {
        setShows(data);
        mediaTypeRef.current = media;
      }

      if (!whatKindRef.current) {
        whatKindRef.current = whatKind;
        setShows(data);
      }
      if (whatKindRef.current !== whatKind) {
        setShows(data);
        whatKindRef.current = whatKind;
      }
      if (pageNumberRef.current > 1) {
        setShows((prev) => {
          return [...new Set([...prev, ...data])];
        });
      }
    } catch (err) {
      console.error('error', err);
    } finally {
      setLoading(false);
    }
  }, [whatKind, media, pageNumber]);

  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
          pageNumberRef.current = pageNumberRef.current + 1;
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    setImagebutton();
  }, [setImagebutton]);

  if (!shows) {
    return <Loading />;
  }

  return (
    <>
      <section className="section-popular">
        <h1 ref={myRef}>{containerTitle}</h1>
        <div className="container-popular">
          {shows.map(
            (
              {
                id,
                title,
                name,
                poster_path: imagePath,
                release_date: releaseDate,
                first_air_date: firstAirDate,
                vote_average: rating,
              },
              index
            ) => {
              const image =
                imagePath === null
                  ? 'https://ctkbiotech.com/wp/wp-content/uploads/2018/03/not-available.jpg'
                  : `${smallImageUrl}${imagePath}`;

              return (
                <CardList
                  myRef={
                    shows.length === index + 1 ? lastMovieElementRef : null
                  }
                  key={id}
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
          {loading ?? <Loading />}
        </div>
      </section>
    </>
  );
});

export default Popular;

Popular.propTypes = {
  containerTitle: PropTypes.string.isRequired,
  media: PropTypes.string.isRequired,
  whatKind: PropTypes.string.isRequired,
  myRef: PropTypes.oneOfType([
    PropTypes.func,

    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};
