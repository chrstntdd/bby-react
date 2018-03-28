import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// CHILD COMPONENTS
import SearchBar from '../SearchBar';
import ProductTable from '../ProductTable';
import SideBar from '../SideBar';
import DashboardHeader from '../DashboardHeader';

import { noop } from '../../util';

import {
  syncToDatabase,
  loadTable,
  formatTable,
  printTable,
  clearTable,
  shuffleTable
} from '../../state/actions';

import './dashboard.scss';

interface IUserProfile {
  email: string;
  password: string;
  profile: {
    firstName: string;
    lastName: string;
  };
  employeeNumber: string;
  storeNumber: string;
  role: 'Member' | 'Client' | 'Owner' | 'Admin';
  isVerified: boolean;
  tableData: any[];
}

interface Props {
  products: any[];
  syncToDatabase: Function;
  printTable: Function;
  formatTable: Function;
  clearTable: Function;
  shuffleTable: Function;
  userProfile?: IUserProfile;
}

export class Dashboard extends PureComponent<Props> {
  public static defaultProps: Partial<Props> = {
    products: [],
    syncToDatabase: noop,
    printTable: noop,
    formatTable: noop,
    clearTable: noop,
    shuffleTable: noop
  };

  public intervalId: number | null = null;

  public componentWillMount() {
    /* Autosave! (every 5 minutes) Only if there is data in the table. */

    if (this.props.products.length > 0) {
      this.intervalId = window.setInterval(() => this.props.syncToDatabase(), 300000);
    } else {
      this.intervalId = null;
    }
  }

  public componentWillUnmount() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public render() {
    let { userProfile } = this.props;

    return (
      <div id="dashboard-wrapper">
        <DashboardHeader userData={userProfile} />
        <div id="main-content-area">
          <SideBar
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

/* istanbul ignore next */
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
