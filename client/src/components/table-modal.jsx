import React from 'react';
import { toggleShowTableModal, getPreviousTableData } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SelectTable from './select-table';

import './table-modal.scss';

export class TableModal extends React.Component {
  componentWillMount() {
    this.props.getPreviousTableData();
  }
  handleShowModal() {
    this.props.toggleShowTableModal();
  }
  render() {
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
              <button>New Table</button>
            </div>
            <div className="content-right">
              <h3>Load an existing table</h3>
              <SelectTable userTables={this.props.selectOptionData} />
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
    getPreviousTableData
  })(TableModal)
);
