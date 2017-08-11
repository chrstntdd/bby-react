import React from 'react';
import {
  toggleShowTableModal,
  getPreviousTableData,
  createNewTable
} from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SelectTable from './select-table';

import './table-modal.scss';

import newTable from '../static/noun_1074124_cc.svg';

export class TableModal extends React.Component {
  componentWillMount() {
    this.props.getPreviousTableData();
  }
  handleShowModal() {
    this.props.toggleShowTableModal();
  }
  handleCreateNewTable() {
    this.props.createNewTable();
  }
  render() {
    const selectComponent = (
      <div>
        <h3>Please choose a previously saved table</h3>
        <SelectTable userTables={this.props.selectOptionData} />
      </div>
    );

    return (
      <div className="global-modal">
        <div className="overlay" />
        <div className="global-modal_contents modal-transition">
          <div className="global-modal-header">
            <h3>Load another table</h3>
            <a href="#" onClick={() => this.handleShowModal()}>
              X
            </a>
          </div>
          <div className="global-modal-body">
            <div className="content-left">
              <h3>Create a new table</h3>
              <button onClick={() => this.handleCreateNewTable()}>
                <img src={newTable} alt="" />
                <p>New table</p>
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
