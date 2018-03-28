import React from 'react';
import { Link } from 'react-router-dom';

const logoutIcon = 'images/logout.svg';

import './dashboard-header.scss';

const DashboardHeader = props => {
  let userName;
  props.userData
    ? (userName = `${props.userData.firstName} ${props.userData.lastName}`)
    : (userName = 'Employee');
  return (
    <header id="dashboard-header">
      <h1>Quantified Dashboard</h1>
      <h2>Hello, {userName}</h2>
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
