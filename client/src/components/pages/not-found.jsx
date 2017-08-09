import React from 'react';
import './not-found.scss';
import { Link } from 'react-router-dom';

export default class NotFoundPage extends React.Component {
  handleBackToSafety() {
    this.props.history.push('/dashboard');
  }
  render() {
    return (
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

        <button id="safety" onClick={() => this.handleBackToSafety()}>
          Back to Safety
        </button>
      </div>
    );
  }
}
