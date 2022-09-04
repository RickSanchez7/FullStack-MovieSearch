import React from 'react';

import Loader from '../../assets/loading-gif2.gif';

import './Loading.scss';

const Loading = () => {
  return (
    <div className="loader">
      <img src={Loader} alt="loading gif" />
    </div>
  );
};

export default Loading;
