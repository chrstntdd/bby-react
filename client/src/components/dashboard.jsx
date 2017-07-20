import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

// CHILD COMPONENTS
import SearchBar from './search-bar';
import ProductTable from './product-table';

export class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>DASHBOARD</h1>
        <Link to="/logout">
          <button>Logout</button>
        </Link>
        <SearchBar />
        <ProductTable />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  content: state.auth.content
});

export default withRouter(connect(mapStateToProps)(Dashboard));
