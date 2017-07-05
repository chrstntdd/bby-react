import React from 'react';

import styles from './app.css';

export default class App extends React.Component {
  render() {
    return (
      <div className={styles.default.card}>
        <header>
          <h1>Header here</h1>
        </header>

        <div className="root">
          {this.props.children}
        </div>
        <footer>
          <p>Footer here</p>
        </footer>
      </div>
    );
  }
}
