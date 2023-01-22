import React, { useContext, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

import FormInput from '../components/FormInput/FormInput';
import { CurrentUserContext } from '../context/current-user';
import { FavoriteMoviesContext } from '../context/favoriteMovies';
import UseRequest from '../hooks/use-request';

import './Signin.scss';

const Register = () => {
  const navigation = useNavigate();
  const [message, setMessage] = useState('');
  const { currentUser, getProfileAndUser } = useContext(CurrentUserContext);
  const { getMovies } = useContext(FavoriteMoviesContext);

  const [credentials, setCredentials] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { userName, email, password, confirmPassword } = credentials;

  const { doRequest, errors } = UseRequest({
    url: '/api/v1/users/signup',
    method: 'post',
    body: { name: userName, email, password },
    onSuccess: () => navigation('/'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords must be the same!');
      setCredentials({ ...credentials, password: '', confirmPassword: '' });
    } else {
      await doRequest();
      await getProfileAndUser();
      await getMovies();
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };
  if (currentUser) return redirect('/');
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="title">Register</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="name"
            name="userName"
            value={userName}
            onChange={handleChange}
            label="Name"
            required
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            label="Password"
            required
          />

          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            label="Confirm Password"
            required
          />
          <button type="submit" className="button">
            Register
          </button>
        </form>
        <div className="message-warning">{message}</div>
        {errors}
      </div>
    </div>
  );
};

export default Register;
