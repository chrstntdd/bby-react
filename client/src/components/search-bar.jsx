import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { getProductDetails } from '../actions';

import './search-bar.scss';

const form = reduxForm({
  form: 'postUPC'
});

export class SearchBar extends React.Component {
  handleInputChange(formProps) {
    const inputValue = formProps.currentTarget.value;

    if (!isNaN(Number(inputValue)) && inputValue.length == 12) {
      // IF VALID UPC
      this.handleFormSubmit(inputValue);
    } else if (isNaN(Number(inputValue))) {
      // IF ANY OF THE VALUES ARE NOT NUMBERS
      alert(`Looks like you didn't quite scan the UPC. Try again please.`);
    } else if (inputValue.length < 12) {
      // IF THE INPUT LENGTH IS SHORTER THAN 12
      console.log(`We need a valid UPC my guy.`);
    }
  }

  handleFormSubmit(inputValue) {
    this.props.getProductDetails({ upc: inputValue.toString() });
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
    const { onChange } = this.props;
    return (
      <section id="search-section">
        <form>
          {this.renderAlert()}
          <div className="input-group">
            <Field
              id="upcInput"
              onChange={this.handleInputChange.bind(this)}
              autoComplete="false"
              name="upc"
              component="input"
              placeholder="UPC"
            />
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  products: state.table.products
});

export default withRouter(
  connect(mapStateToProps, {
    getProductDetails
  })(form(SearchBar))
);
