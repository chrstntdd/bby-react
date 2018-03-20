import * as React from 'react';
import './not-found.scss';
import { Route } from 'react-router-dom';

const NotFoundPage = () => (
  <Route
    render={({ history }) => (
      <div>
        <svg viewBox="0 0 600 300">
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="50%" dy=".35em">
              404 ERROR
            </text>
          </symbol>
          <use className="text" xlinkHref="#s-text" />
          <use className="text" xlinkHref="#s-text" />
          <use className="text" xlinkHref="#s-text" />
          <use className="text" xlinkHref="#s-text" />
          <use className="text" xlinkHref="#s-text" />
        </svg>

        <button id="safety" onClick={() => history.push('/dashboard')}>
          Back to Safety
        </button>
      </div>
    )}
  />
);

export default NotFoundPage;
