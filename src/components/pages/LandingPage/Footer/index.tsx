import * as React from 'react';
import { Link } from 'react-router-dom';

import './footer.scss';

const Footer = props => {
  return (
    <footer>
      <ul>
        {props.footerData.map(
          (data, index) =>
            index === 2 ? (
              <li key={index}>
                <a href={data.link} target="_blank">
                  {data.name}
                </a>
              </li>
            ) : (
              <li key={index}>
                <Link to={data.link}>{data.name}</Link>
              </li>
            )
        )}
        <li>
          <a href="https://github.com/chrstntdd" target="_blank">
            Created by Christian Todd
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
