import * as React from 'react';
import { INVALID_UPC } from '../../state/actions/types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { getProductDetails } from '../../state/actions';
import LoadingIndicator from '../auth/Loading';

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
      console.log(inputValue);
      setTimeout(() => dispatch({ type: INVALID_UPC }), 10);
      alert(`Looks like you didn't quite scan the UPC. Try again please.`);
    }
  };

  render() {
    const {
      handleSubmit,
      waiting,
      lastTimeSaved,
      lastItemScanned
    } = this.props;

    return (
      <section id="search-section">
        <div id="last-time-saved">
          {waiting ? (
            <LoadingIndicator waiting={waiting} message={'Saving...'} />
          ) : (
            <p>Last saved at: {lastTimeSaved}</p>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Field
              id="upcInput"
              onChange={e => this.handleChange(e)}
              autoComplete="false"
              autoFocus="true"
              name="upc"
              component="input"
              placeholder="UPC"
              type="number"
            />
          </div>
        </form>
        <div id="last-item-scanned">
          <p>Last item scanned</p>
          <p className="upc">UPC: {lastItemScanned}</p>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  products: state.table.products,
  tableId: state.table.tableId,
  lastTimeSaved: state.table.lastTimeSaved,
  lastItemScanned: state.table.lastItemScanned,
  waiting: state.auth.waiting
});

export default withRouter(
  connect(mapStateToProps, {
    getProductDetails
  })(form(SearchBar))
);
