import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const CurrentUserContext = createContext();

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState('');

  const getProfile = async () => {
    try {
      const { data } = await axios.get('/api/v1/users/profile');
      if (data) {
        setProfile(data);
      }
    } catch (error) {}
  };

  const fetchCurrentUser = async () => {
    try {
      const { data } = await axios.get('/api/v1/users/currentuser');
      if (data.currentUser) {
        setCurrentUser(data.currentUser);
      }
    } catch (error) {}
  };

  const getProfileAndUser = async () => {
    fetchCurrentUser();
    getProfile();
  };

  const signout = async () => {
    const user = await axios.post('api/v1/users/signout');

    setCurrentUser(await user.data.data);
    setProfile(await user.data.data);
  };

  useEffect(() => {
    fetchCurrentUser();
    getProfile();
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        getProfileAndUser,
        signout,
        profile,
        setProfile,
        getProfile,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserProvider };
