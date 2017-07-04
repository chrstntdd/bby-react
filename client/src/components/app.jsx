import React from 'react';

import Header from './header';
import SearchBar from './search-bar';
import ProductTable from './product-table';

import styles from './app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  newTable() {
    this.setState({
      products: []
    });
  }
  render() {
    return (
      <section className={styles.default.card}>
        <Header onNewTable={() => this.newTable()} />
        <SearchBar />
        <ProductTable />
      </section>
    );
  }
}
