import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.props.protectedTests();
  }
  renderContent() {
    if (this.props.content) {
      return (
        <p>
          {this.props.content}
        </p>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  content: state.auth.content
});

export default connect(mapStateToProps, actions)(Dashboard);
