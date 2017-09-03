import React from 'react';
import { toggleShowTableModal, createNewTable } from '../actions';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './table-modal.scss';

import newTable from '../static/noun_1074124_cc.svg';

export class TableModal extends React.Component {
  render() {
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
              <h3>Start off by creating a new table.</h3>
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
    createNewTable
  })(TableModal)
);
