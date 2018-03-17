import * as React from 'react';
import { Link } from 'react-router-dom';

import './hero-area.scss';

const HeroArea = () => (
  <section id="hero-atf">
    <div className="button-container">
      <Link id="sign-up-button" to="/sign-up">
        <button id="btn-signup">Sign Up</button>
      </Link>

      <Link id="sign-in-button" to="/sign-in">
        <button id="btn-signin">Sign In</button>
      </Link>
    </div>
    <div className="hero-img" />
    <div className="hero-content">
      <h1>Quantified</h1>
      <h2>
        A streamlined system for efficiently and accurately managing retail
        inventory.
      </h2>
    </div>
  </section>
);

export default HeroArea;
