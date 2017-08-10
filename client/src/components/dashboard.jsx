import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// CHILD COMPONENTS
import SearchBar from './search-bar';
import ProductTable from './product-table';
import SideBar from './side-bar';
import DashboardHeader from './dashboard-header';
import TableModal from './table-modal';

import { syncDatabaseWithClient } from '../actions/index.js';

import './dashboard.scss';

export class Dashboard extends React.Component {
  render() {
    let { showModal } = this.props;
    let modal;
    if (showModal) {
      modal = <TableModal />;
    }
    return (
      <div id="dashboard-wrapper">
        {modal}
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
  content: state.auth.content,
  showModal: state.table.showModal
});

export default withRouter(
  connect(mapStateToProps, { syncDatabaseWithClient })(Dashboard)
);
