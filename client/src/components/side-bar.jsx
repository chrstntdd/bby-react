import React from 'react';
import {
  formatTable,
  printTable,
  clearTable,
  syncToDatabase,
  toggleShowTableModal
} from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TableModal from './table-modal';

import printIcon from '../static/noun_772280_cc.svg';
import formatIcon from '../static/noun_796398_cc.svg';
import undoButton from '../static/noun_1031806_cc.svg';
import redoButton from '../static/noun_1031802_cc.svg';
import clearIcon from '../static/noun_926276_cc.svg';
import databaseSync from '../static/noun_932928_cc.svg';
import manage from '../static/noun_1082747_cc.svg';

import './side-bar.scss';

export class SideBar extends React.Component {
  render() {
    return (
      <aside id="side-bar">
        <div className="btn-container">
          <button id="manageButton" onClick={this.props.toggleShowTableModal}>
            <img src={manage} alt="" />
            <p>Manage</p>
          </button>
        </div>
        <div className="btn-container">
          <button id="saveButton" onClick={this.props.syncToDatabase}>
            <img src={databaseSync} alt="" />
            <p>Save</p>
          </button>
        </div>
        <div className="btn-container">
          <button id="formatButton" onClick={this.props.formatTable}>
            <img src={formatIcon} alt="" />
            <p>Format</p>
          </button>
        </div>
        <div className="btn-container">
          <button id="printButton" onClick={this.props.printTable}>
            <img src={printIcon} alt="" />
            <p>Print</p>
          </button>
        </div>
        <div className="btn-container">
          <button id="clearTableButton" onClick={this.props.clearTable}>
            <img id="clear-icon" src={clearIcon} alt="" />
            <p>Clear</p>
          </button>
        </div>
      </aside>
    );
  }
}

const mapStateToProps = state => ({
  products: state.table.products,
  printing: state.table.printing,
  showModal: state.table.showModal
});

export default withRouter(
  connect(mapStateToProps, {
    formatTable,
    printTable,
    clearTable,
    syncToDatabase,
    toggleShowTableModal
  })(SideBar)
);
