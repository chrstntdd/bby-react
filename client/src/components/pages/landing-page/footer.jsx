import React from 'react';
import { Link } from 'react-router-dom';

import './footer.scss';

const Footer = props => {
  return (
    <footer>
      <ul>
        {props.footerData.map(
          (data, index) =>
            index === 0
              ? <li key={index}>
                  <a href={data.link} target="_blank">
                    {data.name}
                  </a>
                </li>
              : <li key={index}>
                  <Link to={data.link}>
                    {data.name}
                  </Link>
                </li>
        )}
      </ul>
    </footer>
  );
};

export default Footer;
