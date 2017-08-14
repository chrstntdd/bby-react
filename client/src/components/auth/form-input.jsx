import React from 'react';
import { Field } from 'redux-form';

import './form-input.scss';

const required = value => (value ? undefined : 'Required');

const renderField = (field, props) =>
  <input
    {...field.input}
    autoComplete="off"
    type={field.type}
    className={field.input.value === '' ? '' : 'has-content'}
  />;

const Input = props =>
  <div className="input-wrapper">
    <Field
      name={props.name}
      component={renderField}
      type={props.type}
      validate={required}
    />
    <label className="register-label" htmlFor={props.name}>
      {props.label}
    </label>
    <span className="focus-border" />
  </div>;

export default Input;
