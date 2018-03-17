import * as React from 'react';
import './loading.scss';

interface Props {
  waiting: boolean;
  message: string;
}

const LoadingIndicator: React.SFC<Props> = ({ waiting, message }) => (
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
