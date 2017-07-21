import React from 'react';
import { Link } from 'react-router-dom';

import logoutIcon from '../static/noun_1155291_cc.svg';

import './dashboard-header.scss';

const DashboardHeader = () => {
  return (
    <header id="dashboard-header">
      <h1>Quantified Dashboard</h1>
      <Link to="/logout">
        <button>
          <img src={logoutIcon} alt="" />
          <p>Sign out</p>
        </button>
      </Link>
    </header>
  );
};

export default DashboardHeader;
