import React from 'react';
import './about-section.scss';

const AboutSection = () => (
  <section id="about-section">
    <h1>About Quantified</h1>
    <blockquote>
      "A streamlined system for efficiently and accurately managing retail
      inventory."
    </blockquote>
    <p>
      That sounds great and all, but what does that mean exactly? Imagine for a
      moment that you are in a retail setting. When shipments of products come
      into your store, they will be accompanied by a manifest that notates
      exactly what products and how many of them were put onto the trailer when
      it left the distribution center. It is the job of one employee to verify
      everything listed on the manifest actually makes it to the store, not an
      easy or quick task by any means.
    </p>
    <p>
      The previous workflow (at least at Best Buy) for counting all of these
      products involved printing out a copy of the aforementioned manifest, then
      tallying up the products one by one. Sounds monotonous and error prone
      right? That's where Quantified comes in to save the day by bearing the
      responsibility of accounting for everything.
    </p>
    <p>
      Instead of manually counting each product, Quantified allows the user to
      simply scan the bar code of the product and automatically populates all of
      its relevant information into a row in a table. From there, after
      everything has been scanned, the table can be formatted to mirror the
      manifest and printed for seamless comparison with the manifest for the
      final verification.
    </p>
    <p>
      Additionally, Quantified is built with battle tested and industry leading
      technology as well as the Best Buy API. All together this yields unmatched
      dependability, speed, and security.
    </p>
  </section>
);

export default AboutSection;