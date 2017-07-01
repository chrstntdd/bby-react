import { h, Component } from 'preact';

import styles from './app.css';

export default class App extends Component {
  render() {
    return (
      <div className={styles.default.card}>
        <h1>Hello, World</h1>
      </div>
    );
  }
}
