import React from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object
    };
    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/login');
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/login');
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
  });
  return connect(mapStateToProps)(Authentication);
}
