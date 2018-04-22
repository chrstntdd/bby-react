import React, { Fragment } from 'react';

interface PInput {
  id: string;
  inputRef: any;
  label: string;
  validationMsg?: string;
  onChange?: (e) => void;
}

const Input: React.SFC<PInput & React.HTMLProps<HTMLInputElement>> = ({
  id,
  label,
  inputRef,
  onChange,
  validationMsg,
  ...inputAttrs
}) => {
  return (
    <Fragment>
      {<label htmlFor={id}>{label}</label>}
      <input {...inputAttrs} autoComplete="off" id={id} ref={inputRef} onChange={onChange} />
      <span className="error-span">{validationMsg}</span>
    </Fragment>
  );
};

export default Input;
