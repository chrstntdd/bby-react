import React from 'react';
import {
  toggleShowTableModal,
  createNewTable,
  getPreviousTableData
} from '../actions';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SelectTable from './select-table';

import './table-modal.scss';

import newTable from '../static/noun_1074124_cc.svg';

export class TableModal extends React.Component {
  render() {
    const selectComponent = (
      <div className="selectWrapper">
        <h3>Load a saved table</h3>
        <SelectTable userTables={this.props.selectOptionData} />
      </div>
    );

    return (
      <div className="global-modal">
        <div className="overlay" onClick={this.props.toggleShowTableModal} />
        <div className="global-modal_contents modal-transition">
          <div className="global-modal-header">
            <h2>Manage tables</h2>
          </div>
          <div className="global-modal-body">
            <div className="content-left">
              <h3>Create a new table</h3>
              <button onClick={this.props.createNewTable}>
                <img src={newTable} alt="create new table icon" />
              </button>
            </div>
            <div className="content-right">
              {this.props.selectOptionData.length > 0
                ? selectComponent
                : <h3>Start off by creating a new table.</h3>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showModal: state.table.showModal,
  selectOptionData: state.table.selectOptionData
});

export default withRouter(
  connect(mapStateToProps, {
    toggleShowTableModal,
    createNewTable,
    getPreviousTableData
  })(TableModal)
);
