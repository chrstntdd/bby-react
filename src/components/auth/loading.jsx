import React from 'react';
import './loading.scss';

const LoadingIndicator = ({ waiting, message }) => (
  <div id="loading-container" className={waiting ? 'show' : 'hide'}>
    <span className="loader loader-circles" />
    <p>{message}</p>
  </div>
);

export default LoadingIndicator;
