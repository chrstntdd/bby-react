import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () =>
  <nav>
    <ul>
      <li>
        <Link to="/"> Home</Link>
      </li>
      <li>
        <Link to="/login"> Login</Link>
      </li>
      <li>
        <Link to="/dashboard"> Dashboard</Link>
      </li>
      <li>
        <Link to="/forgot-password"> Forgot Password?</Link>
      </li>
      <li>
        <Link to="/logout"> Logout</Link>
      </li>
    </ul>
  </nav>;

export default Navigation;
