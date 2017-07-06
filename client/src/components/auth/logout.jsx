import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link, Redirect, withRouter } from 'react-router-dom';

export class Logout extends React.Component {
  componentWillMount() {
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
