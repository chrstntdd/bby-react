import React from 'react';
import { formatTable, printTable, clearTable } from '../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import printIcon from '../static/noun_772280_cc.svg';
import formatIcon from '../static/noun_796398_cc.svg';
import undoButton from '../static/noun_1031806_cc.svg';
import redoButton from '../static/noun_1031802_cc.svg';
import clearIcon from '../static/noun_926276_cc.svg';

import './side-bar.scss';

export class SideBar extends React.Component {
  handleTableFormat() {
    this.props.formatTable();
  }

  handlePrintTable() {
    this.props.printTable();
  }

  handelClearTable() {
    this.props.clearTable();
  }

  render() {
    return (
      <aside id="side-bar">
        <div className="btn-container">
          <button>
            <img src={undoButton} alt="" />
            <p>Undo</p>
          </button>
        </div>
        <div className="btn-container">
          <button>
            <img src={redoButton} alt="" />
            <p>Redo</p>
          </button>
        </div>
        <div className="btn-container">
          {' '}<button onClick={() => this.handleTableFormat()}>
            <img src={formatIcon} alt="" />
            <p>Format</p>
          </button>
        </div>
        <div className="btn-container">
          <button onClick={() => this.handlePrintTable()}>
            <img src={printIcon} alt="" />
            <p>Print</p>
          </button>
        </div>
        <div className="btn-container">
          <button onClick={() => this.handelClearTable()}>
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
  printing: state.table.printing
});

export default withRouter(
  connect(mapStateToProps, { formatTable, printTable, clearTable })(SideBar)
);
