import React, { Fragment } from 'react';

interface PInput {
  id: string;
  inputRef: any;
  label: string;
  isValid: boolean;
  validationMsg?: string;
  onChange?: (e) => void;
}

const Input: React.SFC<PInput & React.HTMLProps<HTMLInputElement>> = ({
  id,
  label,
  isValid,
  inputRef,
  onChange,
  className = '',
  validationMsg = '',
  ...inputAttrs
}) => {
  return (
    <Fragment>
      {<label htmlFor={id}>{label}</label>}
      <input
        {...inputAttrs}
        className={`${className} ${isValid ? '' : 'invalid'}`}
        autoComplete="off"
        id={id}
        ref={inputRef}
        onChange={onChange}
      />
      {!validationMsg ? null : (
        <div className="errors">
          <span className="error-span">{validationMsg}</span>
        </div>
      )}
    </Fragment>
  );
};

export default Input;
