import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.scss';

const NotFound = () => {
  return (
    <section className="section-error">
      <h2>Ups...this page doesn&apos;t exist...</h2>
      <Link to="/" className="btn-link">
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;
