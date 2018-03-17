import * as React from 'react';
import { Field } from 'redux-form';

import './form-input.scss';

const required = value => (value ? undefined : 'Required');

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div id={input.name} className="input-wrapper">
    {touched && (error && <span className="errorSpan">{error}</span>)}
    <input
      {...input}
      autoComplete="off"
      type={type}
      className={input.value === '' ? '' : 'has-content'}
    />
    <label className="register-label" htmlFor={input.name}>
      {label}
    </label>
    <span className="focus-border" />
  </div>
);

const FormInput = ({ name, type, label }) => (
  <Field
    name={name || 'input'}
    component={renderField}
    type={type}
    validate={required}
    label={label}
  />
);

export default FormInput;
