import React, { useCallback, useContext, useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import Loading from '../components/Loading/Loading';

import UseRequest from '../hooks/use-request';
import { CurrentUserContext } from '../context/current-user';

import './Profile.scss';
import FavoriteMoviesList from '../components/FavoriteMoviesList/FavoriteMoviesList';

const Profile = () => {
  const { currentUser, profile } = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const { doRequest, errors } = UseRequest({
    url: '/api/v1/users/profile',
    method: 'put',
    body: { id: profile._id, name, email, password },
  });

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
      } else {
        doRequest();
        setMessage('updated!');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    },
    [confirmPassword, doRequest, password]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [handleSubmit]);

  if (currentUser === null) return redirect('/');
  if (profile === '' || currentUser === '') return <Loading />;

  return (
    <>
      <div className='profile-container'>
        <form onSubmit={handleSubmit} className='form-info'>
          <h2>Profile Info</h2>
          <div className='name'>
            <label>Name</label>
            <input
              value={name}
              placeholder={profile.name}
              type='name'
              name='name'
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='email'>
            <label>Email</label>
            <input
              value={email}
              type='email'
              name='email'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='password'>
            <label>Password</label>
            <input
              type='text'
              name='password'
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className='confirm-password'>
            <label>Confirm Password</label>
            <input
              type='text'
              name='confirmPassword'
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className='profile-message'>{message}</div>
          {errors}
          <button
            disabled={!name && !email && !password}
            type='submit'
            className='profile-button'
          >
            Update
          </button>
        </form>
      </div>
      <FavoriteMoviesList />
    </>
  );
};

export default Profile;
