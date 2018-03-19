import * as React from 'react';
import './how-card.scss';

const Card = props => {
  console.log(props);
  return (
    <div className="how-card">
      <img src={props.img} alt={props.name + ' icon'} />
      <h3>{props.name}</h3>
      <h5>{props.desc}</h5>
    </div>
  );
};

export default Card;
