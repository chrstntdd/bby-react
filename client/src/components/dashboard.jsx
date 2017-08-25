import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// CHILD COMPONENTS
import SearchBar from './search-bar';
import ProductTable from './product-table';
import SideBar from './side-bar';
import DashboardHeader from './dashboard-header';
import TableModal from './table-modal';

import {
  syncToDatabase,
  getPreviousTableData,
  formatTable,
  printTable,
  clearTable,
  toggleShowTableModal
} from '../actions/index.js';

import './dashboard.scss';

export class Dashboard extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.getPreviousTableData();
    }, 500);
  }
  componentWillUpdate() {
    /* Save table to DB ever 2 minutes ONLY if there is a table loaded*/
    this.props.tableId &&
      setInterval(() => this.props.syncToDatabase(), 120000);
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
          <SideBar
            tableId={this.props.tableId}
            toggleShowTableModal={this.props.toggleShowTableModal}
            syncToDatabase={this.props.syncToDatabase}
            formatTable={this.props.formatTable}
            printTable={this.props.printTable}
            clearTable={this.props.clearTable}
          />
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
  connect(mapStateToProps, {
    syncToDatabase,
    getPreviousTableData,
    formatTable,
    printTable,
    clearTable,
    syncToDatabase,
    toggleShowTableModal
  })(Dashboard)
);
