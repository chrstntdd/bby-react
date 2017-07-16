import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { protectedTest } from '../actions/index';

// CHILD COMPONENTS
import SearchBar from './search-bar';
import ProductTable from './product-table';

export class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>DASHBOARD</h1>
        <SearchBar />
        <ProductTable />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  content: state.auth.content
});

export default withRouter(
  connect(mapStateToProps, { protectedTest })(Dashboard)
);
