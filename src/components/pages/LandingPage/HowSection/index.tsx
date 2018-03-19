import * as React from 'react';
import './how-section.scss';
import Card from '../HowCard';

const HowSection = props => {
  const howCards = props.cardData.map((card, index) => <Card key={index} {...card} />);
  return (
    <section id="how-section">
      <div className="card-container">{howCards}</div>
    </section>
  );
};

export default HowSection;
