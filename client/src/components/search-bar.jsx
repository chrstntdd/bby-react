import React from 'react';
import { INVALID_UPC } from '../actions/types.js';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { getProductDetails } from '../actions';

import './search-bar.scss';

const form = reduxForm({
  form: 'postUPC'
});

export class SearchBar extends React.Component {
  handleInputChange(formProps, dispatch) {
    const inputValue = formProps.currentTarget.value;
    formProps.preventDefault();

    if (!isNaN(Number(inputValue)) && inputValue.length == 12) {
      // IF VALID UPC
      this.handleFormSubmit(inputValue);
    } else if (isNaN(Number(inputValue))) {
      // IF ANY OF THE VALUES ARE NOT NUMBERS
      setTimeout(() => {
        this.props.dispatch({ type: INVALID_UPC });
      }, 10);
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
    const { onChange, tableId } = this.props;
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
              type="number"
              /* disable input if there is no current table loaded */
              disabled={tableId ? false : true}
            />
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  products: state.table.products,
  tableId: state.table.tableId
});

export default withRouter(
  connect(mapStateToProps, {
    getProductDetails
  })(form(SearchBar))
);
