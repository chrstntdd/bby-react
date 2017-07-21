import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// CHILD COMPONENTS
import SearchBar from './search-bar';
import ProductTable from './product-table';
import SideBar from './side-bar';
import DashboardHeader from './dashboard-header';

import './dashboard.scss';

export class Dashboard extends React.Component {
  render() {
    return (
      <div id="dashboard-wrapper">
        <DashboardHeader />
        <div id="main-content-area">
          <SideBar />
          <section id="main-table-area">
            <SearchBar />
            <ProductTable />
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  content: state.auth.content
});

export default withRouter(connect(mapStateToProps)(Dashboard));
