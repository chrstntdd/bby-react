import * as React from 'react';
import { Link } from 'react-router-dom';

import './landing-page.scss';

const navigationButtons =
  'trans-300ms-all z-10 font-semibold rounded-full px-8 py-2 leading-normal bg-transparent border border-grey text-grey hover:border-bby-blue hover:bg-bby-blue hover:text-white m-6';

const LandingPage = () => (
  <div>
    <section className="h-screen w-screen">
      <div className="w-full absolute pin-t z-10 flex justify-center md:justify-end">
        <Link to="/sign-up">
          <button className={navigationButtons}>Sign Up</button>
        </Link>

        <Link to="/sign-in">
          <button className={navigationButtons}>Sign In</button>
        </Link>
      </div>
      <div className="hero-img h-screen w-screen absolute pin" />
      <div className="kinda-center z-10 w-full">
        <h1
          className={
            'text-white italic text-center leading-none whitespace-no-wrap text-5xl md:text-massive tracking-wide mb-2'
          }
        >
          Quantified
        </h1>
        <h2 className="text-white italic text-center leading-none text-xl font-thin">
          A streamlined system for efficiently and accurately managing retail inventory.
        </h2>
      </div>
    </section>
    <section id="how-section">
      <div className="card-container">
        <div className="how-card">
          <img src={'images/atom.svg'} alt={'atom icon'} />
          <h3>Simple</h3>
          <h5>...but powerful</h5>
        </div>
        <div className="how-card">
          <img src={'images/handshake.svg'} alt={'handshake icon'} />
          <h3>Reliable</h3>
          <h5>There when you need it</h5>
        </div>
        <div className="how-card">
          <img src={'images/padlock.svg'} alt={'padlock icon'} />
          <h3>Safe</h3>
          <h5>Without compromises</h5>
        </div>
        <div className="how-card">
          <img src={'images/rocket.svg'} alt={'rocket icon'} />
          <h3>Fast</h3>
          <h5>Designed with speed in mind</h5>
        </div>
      </div>
    </section>
    <section id="about-section">
      <h1>About Quantified</h1>
      <blockquote>
        "A streamlined system for efficiently and accurately managing retail inventory."
      </blockquote>
      <p>
        That sounds great and all, but what does that mean exactly? Imagine for a moment that you
        are in a retail setting. When shipments of products come into your store, they will be
        accompanied by a manifest that notates exactly what products and how many of them were put
        onto the trailer when it left the distribution center. It is the job of one employee to
        verify everything listed on the manifest actually makes it to the store, not an easy or
        quick task by any means.
      </p>
      <p>
        The previous workflow (at least at Best Buy) for counting all of these products involved
        printing out a copy of the aforementioned manifest, then tallying up the products one by
        one. Sounds monotonous and error prone right? That's where Quantified comes in to save the
        day by bearing the responsibility of accounting for everything.
      </p>
      <p>
        Instead of manually counting each product, Quantified allows the user to simply scan the bar
        code of the product and automatically populates all of its relevant information into a row
        in a table. From there, after everything has been scanned, the table can be formatted to
        mirror the manifest and printed for seamless comparison with the manifest for the final
        verification.
      </p>
      <p>
        Additionally, Quantified is built with battle tested and industry leading technology as well
        as the Best Buy API. All together this yields unmatched dependability, speed, and security.
      </p>
    </section>
    <footer>
      <ul>
        <li>
          <Link to={'/sign-up'}>Start here</Link>
        </li>

        <li>
          <Link to={'/sign-in'}>Sign in</Link>
        </li>

        <li>
          <a href={'https://developer.bestbuy.com/api-status'} target="_blank">
            Official Best Buy API Status
          </a>
        </li>

        <li>
          <a href="https://github.com/chrstntdd" target="_blank">
            Created by Christian Todd
          </a>
        </li>
      </ul>
    </footer>
  </div>
);

export default LandingPage;
