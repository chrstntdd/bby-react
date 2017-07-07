import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { getProductDetails } from '../actions';

const form = reduxForm({
  form: 'postUPC'
});

export class SearchBar extends React.Component {
  handleFormSubmit(formProps) {
    this.props.getProductDetails(formProps);
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span>
            <strong>Error!</strong>
            {this.props.errorMessage}
          </span>
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
        <div className="input-group">
          <Field
            name="upc"
            component="input"
            type="number"
            placeholder="Enter UPC"
          />
          <label htmlFor="upc">UPC</label>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  products: state.table.products
});

export default withRouter(
  connect(mapStateToProps, { getProductDetails })(form(SearchBar))
);
