import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// CHILD COMPONENTS
import SearchBar from './search-bar';
import ProductTable from './product-table';
import SideBar from './side-bar';
import DashboardHeader from './dashboard-header';
import TableModal from './table-modal';

import { syncToDatabase, getPreviousTableData } from '../actions/index.js';

import './dashboard.scss';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getPreviousTableData();
  }
  componentWillUpdate() {
    /* Save table to DB ever 2 minutes ONLY if there is a table loaded*/
    this.props.tableId && setInterval(() => this.handleAutoSave(), 120000);
  }

  handleAutoSave() {
    this.props.syncToDatabase();
  }

  render() {
    let { showModal, userProfile } = this.props;

    let modal;
    if (showModal) {
      modal = <TableModal />;
    }
    return (
      <div id="dashboard-wrapper">
        {modal}
        <DashboardHeader userData={userProfile} />
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
  userProfile: state.auth.userProfile,
  showModal: state.table.showModal,
  tableId: state.table.tableId
});

export default withRouter(
  connect(mapStateToProps, { syncToDatabase, getPreviousTableData })(Dashboard)
);
