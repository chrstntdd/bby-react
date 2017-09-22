import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// CHILD COMPONENTS
import SearchBar from './search-bar';
import ProductTable from './product-table';
import SideBar from './side-bar';
import DashboardHeader from './dashboard-header';

import {
  syncToDatabase,
  loadTable,
  formatTable,
  printTable,
  clearTable,
  shuffleTable
} from '../actions/index.js';

import './dashboard.scss';
let intervalId;

export class Dashboard extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  componentWillUnmount() {
    clearInterval(intervalId);
  }
  render() {
    /* Autosave! (every 5 minutes) Only if there is data in the table. */
    if (this.props.products) {
      intervalId = setInterval(() => this.props.syncToDatabase(), 300000);
    }

    let { userProfile } = this.props;

    return (
      <div id="dashboard-wrapper">
        <DashboardHeader userData={userProfile} />
        <div id="main-content-area">
          <SideBar
            tableId={this.props.tableId}
            syncToDatabase={this.props.syncToDatabase}
            formatTable={this.props.formatTable}
            printTable={this.props.printTable}
            clearTable={this.props.clearTable}
            shuffleTable={this.props.shuffleTable}
            userData={userProfile}
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
  products: state.table.products
});

export default withRouter(
  connect(mapStateToProps, {
    syncToDatabase,
    loadTable,
    formatTable,
    printTable,
    clearTable,
    shuffleTable
  })(Dashboard)
);
