import React, { useCallback, useEffect, useState } from 'react';

import Loading from '../components/Loading/Loading';
import { FetchDetails } from '../utils/fetchData';
import Person from '../components/Person/Person';

const SinglePerson = () => {
  const params = window.location.pathname.split('/');
  const id = params[2];

  const [person, setPerson] = useState('');

  const fetchPerson = useCallback(async () => {
    const res = await FetchDetails('person', id);
    const { data } = res;

    setPerson(data);
  }, [id]);

  useEffect(() => {
    fetchPerson();
  }, [fetchPerson]);

  if (!person) {
    return <Loading />;
  }

  return <Person person={person} />;
};

export default SinglePerson;
