import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../components/Loading/Loading';
import Featured from '../components/Featured/Featured';
import NowPlaying from '../components/NowPlaying/NowPlaying';

import { fetchFeatured, fetchAll } from '../utils/fetchData';
import { smallImageUrl, ImageUrl } from '../utils/url';

import './Home.scss';

const Home = () => {
  const [featured, setFeatured] = useState('');
  const [query, setQuery] = useState('');
  const [shows, setShows] = useState([]);

  const fetchMovie = async () => {
    const res = await fetchFeatured('trending/all/day');
    const { data } = res;
    setFeatured(data);
  };

  const queryList = useCallback(async () => {
    if (query.length > 1) {
      const res = await fetchAll(query);
      const { data } = res;
      setShows(data.results);
    }
  }, [setShows, query]);

  useEffect(() => {
    fetchMovie();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      queryList();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [queryList]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Close dropdown when clicking outside
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setQuery(query);
        }
      };

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  if (!featured) {
    return <Loading />;
  }

  return (
    <>
      <section className="section-container">
        <div
          className="img-background"
          style={{
            backgroundImage: `url(${ImageUrl}${featured.results[0].backdrop_path})`,
          }}
        />
        <div className="home-input" ref={wrapperRef}>
          <div className={`dropdown ${query ? 'is-active' : ''}`}>
            <h1>Movie Search</h1>
            <input
              className="input"
              type="text"
              name="query"
              placeholder="Search for a movie or tv show..."
              value={query}
              onChange={handleChange}
            />
            <div className="dropdown-menu">
              <div className="dropdown-content results">
                {shows.map((show) => {
                  const {
                    title,
                    name,
                    poster_path: image,
                    id,
                    media_type: media,
                  } = show;
                  const imageSmall = !image
                    ? 'https://ctkbiotech.com/wp/wp-content/uploads/2018/03/not-available.jpg'
                    : smallImageUrl + image;

                  return (
                    <Link
                      to={`/shows/${media}/${id}`}
                      key={id}
                      className="dropdown-item"
                    >
                      <div className="item">
                        <img src={imageSmall} alt={`${title}poster`} />
                        <p>{title || name}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured">
        <Featured mediaType="all" headTitle="trending" />
        <NowPlaying headTitle="now playing" />
      </section>
    </>
  );
};

export default Home;
