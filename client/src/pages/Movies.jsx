import React, { useCallback, useEffect, useRef, useState } from 'react';
/* eslint-disable-next-line */
import PropTypes from 'prop-types';

import Popular from '../components/Popular/Popular';

import './Movies.scss';

const Movies = () => {
  const [title, setTitle] = useState("what's popular");
  const [whatKind, setWhatKind] = useState('popular');

  // scroll up movies result on click
  const myRef = useRef(null);

  const executeScroll = () =>
    myRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });

  //fetch url
  const x = window.location.pathname;
  let media = x.split('/')[1];
  if (media === 'movies') {
    media = 'movie';
  }

  const handleClick = useCallback(
    (titleToshow, kind) => {
      setTitle(titleToshow);
      setWhatKind(kind);
    },
    // eslint-disable-next-line
    [title, whatKind]
  );

  useEffect(() => {
    executeScroll();
  }, [handleClick, media]);

  return (
    <div className="section-movies">
      <div className="filters">
        <h2>Show me:</h2>
        <div className="control">
          {/* eslint-disable-next-line */}
          <label
            className="radio"
            onClick={() => handleClick("what's popular", 'popular')}
          >
            <input type="radio" name="answer" defaultChecked />
            popular
          </label>
          {/* eslint-disable-next-line */}
          <label
            className="radio"
            onClick={() => handleClick('top rated', 'top_rated')}
          >
            <input type="radio" name="answer" />
            top rated
          </label>
        </div>
      </div>
      <Popular
        containerTitle={title}
        media={media}
        whatKind={whatKind}
        myRef={myRef}
      />
    </div>
  );
};

export default Movies;
