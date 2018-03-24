import React, { SFC } from 'react';
import './loading.scss';

interface Props {
  waiting: boolean;
  message: string;
}

const LoadingIndicator: SFC<Props> = ({ waiting, message }) => (
  <div id="loading-container" className={waiting ? 'show' : 'hide'}>
    <span className="loader loader-circles" />
    <p>{message}</p>
  </div>
);

LoadingIndicator.defaultProps = {
  waiting: false,
  message: ''
};

export default LoadingIndicator;
