import React, { useContext, useState } from 'react';
import { NavLink, redirect, useNavigate } from 'react-router-dom';

import FormInput from '../components/FormInput/FormInput';
import { CurrentUserContext } from '../context/current-user';
import { FavoriteMoviesContext } from '../context/favoriteMovies';

import UseRequest from '../hooks/use-request';

import './Signin.scss';

const Signin = () => {
  const navigate = useNavigate();
  const { currentUser, getProfileAndUser } = useContext(CurrentUserContext);
  const { getMovies } = useContext(FavoriteMoviesContext);

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { email, password } = credentials;

  const { doRequest, errors } = UseRequest({
    url: '/api/v1/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => navigate('/'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await doRequest();
    await getProfileAndUser();
    await getMovies();
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...credentials, [name]: value });
  };
  if (currentUser) return redirect('/');
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="button">
            Login
          </button>
        </form>
        {errors}
        <p className="to-register-page">
          Don&apos;t have an account?
          <NavLink className="to-register-page-link" to="/register">
            Get one now!
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signin;
