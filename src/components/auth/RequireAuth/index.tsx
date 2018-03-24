import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
interface Props {
  isAuthenticated: boolean;
  history: any;
  render: Function;
}

export default ComposedComponent => {
  class RequireAuth extends Component<Props> {
    public static defaultProps: Partial<Props> = {
      isAuthenticated: false
    };
    componentWillMount() {
      !this.props.isAuthenticated && this.props.history.push('/sign-in');
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  return withRouter(connect(mapStateToProps)(RequireAuth));
};
