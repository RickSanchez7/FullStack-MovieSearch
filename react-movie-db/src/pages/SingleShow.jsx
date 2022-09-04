import React, { useEffect, useState, useCallback } from 'react';
import { FaArrowLeft, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import Cast from '../components/Cast/Cast';
import Carousel from '../components/Carousel/Carousel';
import Loading from '../components/Loading/Loading';
import colorPicker from '../utils/colorPicker';

import { FetchDetails, FetchCast } from '../utils/fetchData';
import { ImageUrl, smallImageUrl } from '../utils/url';

import './SingleShow.scss';
import AddFavoriteMovie from '../components/AddFavoriteMovie/AddFavoriteMovie';

const SingleShow = () => {
  const params = window.location.pathname.split('/');
  const mediaType = params[2];
  const id = params[3];

  const [show, setShow] = useState('');
  const [cast, setCast] = useState([]);
  const [production, setProduction] = useState([]);

  const fetchShow = useCallback(async () => {
    const res = await FetchDetails(mediaType, id);
    const { data } = res;

    setShow(data);
  }, [id, mediaType]);

  const fetchCast = useCallback(async () => {
    const res = await FetchCast(mediaType, id);
    const { data } = res;
    setCast(data.cast.filter((item, index) => index < 10));
    setProduction(data.crew.filter((item, index) => index < 10));
  }, [id, mediaType]);

  // Fetching show details and cast
  useEffect(() => {
    fetchShow();
    fetchCast();
  }, [fetchShow, fetchCast]);

  // Destructing show variables
  const {
    title,
    overview,
    tagline,
    name,
    vote_average: rating,
    release_date: releaseDate,
    poster_path: Poster,
    backdrop_path: backgroundImage,
    runtime,
    genres,
    episode_run_time: episodeRunTime,
    first_air_date: firstEpisode,
  } = show;

  // Select production crew
  const director = production.filter(({ job }) => job === 'Director');

  // Select how many starts in rating
  const StarPicker = (fullStar, halfStar) => {
    if (rating >= fullStar) return <FaStar />;
    if (rating >= halfStar) return <FaStarHalfAlt />;
    return <FaRegStar />;
  };

  if (!show) {
    return <Loading />;
  }

  return (
    <>
      <section className="hero-container">
        <NavLink to="/" className="button is-primary">
          <FaArrowLeft />
          <p>Home</p>
        </NavLink>
        <div
          className="img-background"
          style={{
            backgroundImage: `url(${ImageUrl}${backgroundImage})`,
          }}
        />
        <div className="container">
          <img src={`${smallImageUrl}${Poster}`} alt={Poster} />

          <div className="container-overview">
            <h1 className="image-title">
              <b>{title || name}</b>
            </h1>

            <ul className="information">
              <li>{releaseDate || firstEpisode}</li>
              {genres.map(({ name: genre, id: idx }) => (
                <li key={idx}>{genre}</li>
              ))}
              <li>{`${runtime || episodeRunTime}min`}</li>
            </ul>
            {tagline ? <h2 className="tagline">{tagline}</h2> : ''}
            <div className="overview">
              <h2>Overview</h2>
              <p>{overview}</p>
            </div>
            <div className="rating">
              <h2 style={{ color: `${colorPicker(rating)}` }}>
                {rating.toFixed(1)}
              </h2>
              <div className="star-rating">
                {StarPicker(1.5, 0.5)}
                {StarPicker(3.5, 2.5)}
                {StarPicker(5.5, 4.5)}
                {StarPicker(7.5, 6.5)}
                {StarPicker(10, 8.5)}
              </div>
              <AddFavoriteMovie
                className="like-movie"
                id={rating}
                titleOrName={title || name}
                imageUrl={`${smallImageUrl}${Poster}`}
                link={`/shows/${mediaType}/${id}`}
              />
            </div>

            <div className="production">
              {director.map(({ job, name: directorName, id: index }) => {
                return (
                  <div key={index} className="production-member">
                    <div className="production-name">{directorName}</div>
                    <p>{job}</p>
                  </div>
                );
              })}
              {production
                .filter(({ job }) => job !== 'Director')
                .map(({ job, name: crewMember }) => {
                  return (
                    <div key={crewMember + job} className="production-member">
                      <div className="production-name">{crewMember}</div>
                      <p>{job}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
      <Cast cast={cast} />
      <Carousel mediaType={mediaType} id={id} />
    </>
  );
};

export default SingleShow;
