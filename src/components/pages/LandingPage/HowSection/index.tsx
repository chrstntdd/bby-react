import * as React from 'react';
import './how-section.scss';
import Card from '../HowCard';

import simple from '../../../static/noun_971031_cc.svg';
import reliable from '../../../static/noun_1007187_cc.svg';
import secure from '../../../static/noun_821171_cc.svg';
import fast from '../../../static/noun_658468_cc.svg';

const HowSection = props => {
  const howCards = props.cardData.map((card, index) => (
    <Card key={index} {...card} />
  ));
  return (
    <section id="how-section">
      <div className="card-container">{howCards}</div>
    </section>
  );
};

export default HowSection;
