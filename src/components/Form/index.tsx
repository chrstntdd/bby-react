import React, { PureComponent } from 'react';

interface IInput {
  id: string;
  value: string;
  isValid?: boolean;
  checked?: boolean;
}

interface PForm {
  handleSubmitCb: () => any;
  refs: any[];
}

interface SForm {
  inputs: [IInput];
}

export class Form extends PureComponent<PForm, SForm> {
  state = {
    fields: {
      ...Object.keys(this.props.fieldDefaults).reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: {
            value: this.props.fieldDefaults[curr],
            isDirty: false
          }
        }),
        {}
      )
    }
  };

  // componentDidUpdate() {
  //   console.log(this.props.refs);
  //   const uh = this.props.refs.map(({ current }) => current.attributes['data-isvalid'].value);
  //   console.log(uh);
  //   // console.dir(this.props.children.state);
  // }

  handleSubmit = e => {
    /* GET THE STATE OF EACH OF THE CHILDREN AND RETURN STATE */
    e.preventDefault();

    this.props.handleSubmitCb();
  };

  handleInputChange = (inputId: any, isValid: boolean, value?: string) => {
    console.log('CALLED');
    this.setState({
      [inputId]: {
        isValid: isValid,
        value: value
      }
    });
  };

  render() {
    return <form onSubmit={this.handleSubmit}>{this.props.children}</form>;
  }
}
