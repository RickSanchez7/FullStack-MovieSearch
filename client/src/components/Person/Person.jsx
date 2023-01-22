import React from 'react';
/* eslint-disable-next-line */
import PropTypes from 'prop-types';

// import LazyLoad from 'react-lazyload';

import { smallImageUrl } from '../../utils/url';

import './Person.scss';

const Person = ({ person }) => {
  const {
    biography,
    birthday,
    known_for_department: knownFor,
    name,
    place_of_birth: placeOfBirth,
    profile_path: image,
    gender,
  } = person;

  const nullItem = '-';

  return (
    <div className='person-container'>
      <div className='information'>
        {/* <LazyLoad height={200} once resize={true} overflow={true}> */}
        <img src={`${smallImageUrl}${image}`} alt={name} />
        {/* </LazyLoad> */}
        <div className='info'>
          <h1>{name}</h1>
          <h2>personal info</h2>
          <div className='info-details'>
            <div className='info-detail'>
              <h3>known for</h3>
              <p>{knownFor || nullItem}</p>
            </div>
            <div className='info-detail'>
              <h3>birthday</h3>
              <p>{birthday || nullItem}</p>
            </div>
            <div className='info-detail'>
              <h3>place of birth</h3>
              <p>{placeOfBirth || nullItem}</p>
            </div>
            <div className='info-detail'>
              <h3>gender</h3>
              <p>{gender === 1 ? 'female' : 'male' || nullItem}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='biography'>
        <h2>biography</h2>
        <p>{biography}</p>
      </div>
    </div>
  );
};

export default Person;

Person.propTypes = {
  person: PropTypes.instanceOf(Object).isRequired,
};
