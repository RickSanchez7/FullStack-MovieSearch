import React, { useState, useContext } from 'react';
import axios from 'axios';

import { CurrentUserContext } from '../context/current-user';

import './use-request.scss';

const UseRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const { setProfile } = useContext(CurrentUserContext);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      if (method === 'put') {
        setProfile(response.data);
      }
      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (error) {
      setErrors(
        <div className="errors">
          <ul className="my-0">
            {error.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default UseRequest;
