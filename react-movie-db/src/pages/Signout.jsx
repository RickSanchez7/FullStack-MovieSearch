import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import useRequest from '../hooks/use-request';
import { CurrentUserContext } from '../context/current-user';

const Signout = () => {
  const { currentUser, signout } = useContext(CurrentUserContext);
  const { doRequest } = useRequest({
    url: '/api/v1/users/signout',
    method: 'post',
    body: {},
  });

  useEffect(() => {
    doRequest();
    signout();
  }, [doRequest, signout]);

  if (!currentUser) return <Redirect to="/" />;
  return <div>Sign out</div>;
};

export default Signout;
