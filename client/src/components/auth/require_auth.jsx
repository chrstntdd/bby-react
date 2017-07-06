import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

export default ComposedComponent => {
  class Authentication extends React.Component {
    static propTypes = {
      router: PropTypes.object,
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired
    };
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/login');
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
