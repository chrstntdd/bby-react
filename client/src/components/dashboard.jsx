import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { protectedTest } from '../actions/index';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.props.protectedTest();
  }
  render() {
    return (
      <div>
        <h1>DASHBOARD</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  content: state.auth.content
});

export default withRouter(
  connect(mapStateToProps, { protectedTest })(Dashboard)
);
