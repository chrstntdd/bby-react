import * as React from 'react';
const _debounce = require('lodash.debounce');

import printIcon from '../static/noun_772280_cc.svg';
import formatIcon from '../static/noun_796398_cc.svg';
import undoButton from '../static/noun_1031806_cc.svg';
import redoButton from '../static/noun_1031802_cc.svg';
import clearIcon from '../static/noun_926276_cc.svg';
import databaseSync from '../static/noun_932928_cc.svg';
import manage from '../static/noun_1082747_cc.svg';
import shuffle from '../static/shuffle.svg';

import './side-bar.scss';

export const SideBar = props => {
  let userRole;
  props.userData ? (userRole = props.userData.role) : (userRole = 'Member');
  return (
    <aside id="side-bar">
      <div className="btn-container">
        <button
          id="saveButton"
          onClick={_debounce(() => props.syncToDatabase(), 5000, {
            maxWait: 100,
            leading: true
          })}
        >
          <img src={databaseSync} alt="Save Table" />
          <p>Save</p>
        </button>
      </div>
      <div className="btn-container">
        <button id="formatButton" onClick={() => props.formatTable()}>
          <img src={formatIcon} alt="Format Table" />
          <p>Format</p>
        </button>
      </div>
      <div className="btn-container">
        <button id="printButton" onClick={() => props.printTable()}>
          <img src={printIcon} alt="Print Table" />
          <p>Print</p>
        </button>
      </div>
      {userRole == 'Admin' && (
        <div className="btn-container">
          <button id="shuffleTableButton" onClick={() => props.shuffleTable()}>
            <img src={shuffle} alt="Shuffle Table" />
            <p>Shuffle</p>
          </button>
        </div>
      )}
      <div className="btn-container">
        <button
          id="clearTableButton"
          disabled={userRole == 'Admin'}
          onClick={() => props.clearTable()}
        >
          <img id="clear-icon" src={clearIcon} alt="Clear Table" />
          <p>Clear</p>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
