import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { confirmEmail } from '../../actions/index';

export class VerifyEmail extends React.Component {
  componentDidMount() {
    const verifyEmailToken = this.props.match.params.verifyToken;
    this.props.confirmEmail(verifyEmailToken);
  }

  redirectToDash() {
    this.props.history.push('/dashboard');
  }
  render() {
    return (
      <div>
        <h1>Thanks for registering!</h1>
        <button onClick={() => this.redirectToDash()}>Get started</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //
});

export default withRouter(
  connect(mapStateToProps, { confirmEmail })(VerifyEmail)
);
