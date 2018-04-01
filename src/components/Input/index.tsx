import React, { PureComponent, Fragment } from 'react';

import { noop, debounce } from '@/util';
import { Maybe } from '@/fp';

interface PInput {
  name: string;
  inputRef: any;
  validateFn?: (val) => Maybe<string>;
  validationCb?: (inputId: any, isValid: boolean, value?: string) => void;
}

interface SInput {
  value: string;
  validationMsg: string;
}

export class Input extends PureComponent<PInput & React.HTMLProps<HTMLInputElement>, SInput> {
  public static defaultProps: Partial<PInput> = {
    validateFn: noop,
    validationCb: noop
  };

  state = {
    value: '',
    validationMsg: ''
  };

  handleValidation = debounce((inputValue: string) => {
    const validationMsg = this.props.validateFn(inputValue);

    validationMsg.caseOf({
      just: msg => {
        /* FIELD IS INVALID */
        this.props.validationCb(this.props.name, false, inputValue);

        this.setState({ validationMsg: msg });
      },

      nothing: () => {
        /* FIELD IS VALID */
        this.props.validationCb(this.props.name, true, inputValue);

        this.setState({ validationMsg: '' });
      }
    });
  }, 200);

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;

    this.setState({ value: inputValue }, () => this.handleValidation(inputValue));
  };

  render() {
    /* THOUGH THE VALIDATION FUNCTIONS ARE NOT USED HERE, BUT IN ORDER TO KEEP 
       REACT HAPPY, THE EXTRA PROPS SHOULD NOT BE ADDED TO THE INPUT ELEMENT
    */
    const { name, label, inputRef, validateFn, validationCb, ...rest } = this.props;
    const { validationMsg, value } = this.state;

    return (
      <Fragment>
        {validationMsg ? <span className="error-span">{validationMsg}</span> : null}
        <input
          {...rest}
          ref={inputRef}
          onChange={this.handleChange}
          className={value === '' ? '' : 'has-content'}
        />
        {label ? <label htmlFor={name}>{label}</label> : null}
      </Fragment>
    );
  }
}

export default Input;
