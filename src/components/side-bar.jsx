import React from 'react';
const _debounce = require('lodash.debounce');

import printIcon from '../static/noun_772280_cc.svg';
import formatIcon from '../static/noun_796398_cc.svg';
import undoButton from '../static/noun_1031806_cc.svg';
import redoButton from '../static/noun_1031802_cc.svg';
import clearIcon from '../static/noun_926276_cc.svg';
import databaseSync from '../static/noun_932928_cc.svg';
import manage from '../static/noun_1082747_cc.svg';

import './side-bar.scss';

export const SideBar = props => {
  return (
    <aside id="side-bar">
      <div className="btn-container">
        <button id="manageButton" onClick={() => props.toggleShowTableModal()}>
          <img src={manage} alt="" />
          <p>Manage</p>
        </button>
      </div>
      <div className="btn-container">
        {/* button is disabled until a tableId is set.
          * also the button can't be spammed :) */}
        <button
          id="saveButton"
          disabled={!props.tableId}
          onClick={_debounce(() => props.syncToDatabase(), 5000, {
            maxWait: 100,
            leading: true
          })}
        >
          <img src={databaseSync} alt="" />
          <p>Save</p>
        </button>
      </div>
      <div className="btn-container">
        <button id="formatButton" onClick={() => props.formatTable()}>
          <img src={formatIcon} alt="" />
          <p>Format</p>
        </button>
      </div>
      <div className="btn-container">
        <button id="printButton" onClick={() => props.printTable()}>
          <img src={printIcon} alt="" />
          <p>Print</p>
        </button>
      </div>
      <div className="btn-container">
        <button id="clearTableButton" onClick={() => props.clearTable()}>
          <img id="clear-icon" src={clearIcon} alt="" />
          <p>Clear</p>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
