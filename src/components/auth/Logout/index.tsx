import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../state/actions';
import { Link, Redirect, withRouter } from 'react-router-dom';

export class Logout extends Component {
  componentDidMount() {
    this.props.logoutUser();
  }

  render() {
    return (
      <div>
        <Redirect to="/" />;
      </div>
    );
  }
}

export default withRouter(connect(null, actions)(Logout));
