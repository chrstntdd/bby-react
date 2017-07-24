import React from 'react';
import { Field } from 'redux-form';

import './form-input.scss';

const renderField = (field, props) =>
  // <div className="input-control">
  <input
    {...field.input}
    autoComplete="off"
    type={field.type}
    className={field.input.value === '' ? '' : 'has-content'}
  />;
//  {field.touched &&
//   field.error &&
//   <div className="error">
//      {field.error}
//    </div>}
//  </div>;

const Input = props =>
  <div className="input-wrapper">
    <Field name={props.name} component={renderField} type={props.type} />
    <label className="register-label" htmlFor={props.name}>
      {props.label}
    </label>
    <span className="focus-border" />
  </div>;

export default Input;
