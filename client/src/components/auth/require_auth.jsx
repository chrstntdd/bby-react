import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default ComposedComponent => {
  class Authentication extends React.Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/sign-in');
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/sign-in');
      }
    }
    render() {
      const { match, location, history, router } = this.props;
      return <ComposedComponent {...this.props} />;
    }
  }
  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
  });
  return withRouter(connect(mapStateToProps)(Authentication));
};
