import React from 'react';
import { Link } from 'react-router-dom';

import './hero-area.scss';

const Scroll = require('react-scroll');
const LinkOnPage = Scroll.Link;

const HeroArea = () => {
  return (
    <section id="hero-atf">
      <div className="button-container">
        <LinkOnPage smooth={true} to="register">
          <button id="btn-signup">Sign Up</button>
        </LinkOnPage>

        <Link to="/login">
          <button id="btn-signin">Sign In</button>
        </Link>
      </div>
      <div className="hero-img" />
      <div className="hero-content">
        <h1>Quantified</h1>
        <h3>
          by{' '}
          <a href="https://github.com/chrstntdd" target="_blank">
            Christian Todd
          </a>{' '}
        </h3>
      </div>
      <div className="mock-app" />
    </section>
  );
};

export default HeroArea;
