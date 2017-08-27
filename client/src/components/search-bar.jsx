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
  handleChange = (e, props) => {
    const { getProductDetails, dispatch } = this.props;
    const inputValue = e.currentTarget.value;

    if (!isNaN(Number(inputValue)) && inputValue.length === 12) {
      /* If the UPC is valid */
      getProductDetails({ upc: inputValue.toString() });
    } else if (isNaN(Number(inputValue))) {
      /* If the input is not a number  */
      setTimeout(() => dispatch({ type: INVALID_UPC }), 10);
      alert(`Looks like you didn't quite scan the UPC. Try again please.`);
    }
  };

  render() {
    const { tableId, handleSubmit } = this.props;

    return (
      <section id="search-section">
        <div id="last-time-saved">
          <p>
            Last saved at: {this.props.lastTimeSaved}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Field
              id="upcInput"
              onChange={e => this.handleChange(e)}
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
        <div id="last-item-scanned">
          <p>Last item scanned</p>
          <p className="upc">
            UPC: {this.props.lastItemScanned}
          </p>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  products: state.table.products,
  tableId: state.table.tableId,
  lastTimeSaved: state.table.lastTimeSaved,
  lastItemScanned: state.table.lastItemScanned
});

export default withRouter(
  connect(mapStateToProps, {
    getProductDetails
  })(form(SearchBar))
);
