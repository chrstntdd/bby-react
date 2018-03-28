import React from 'react';
import _debounce from 'lodash.debounce';

const printIcon = '/images/printer.svg';
const formatIcon = '/images/broom.svg';
const clearIcon = '/images/x.svg';
const databaseSync = '/images/database.svg';
const shuffle = '/images/shuffle.svg';

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
