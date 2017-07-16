import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { getProductDetails, formatTable } from '../actions';

const form = reduxForm({
  form: 'postUPC'
});

export class SearchBar extends React.Component {
  handleFormSubmit(formProps) {
    this.props.getProductDetails(formProps);
  }
  handleTableFormat() {
    this.props.formatTable();
  }
  handlePrintTable() {
    window.print();
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
      <section>
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
        <button onClick={() => this.handleTableFormat()}> FORMAT TABLE</button>
        <button onClick={() => this.handlePrintTable()}> PRINT TABLE</button>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  products: state.table.products
});

export default withRouter(
  connect(mapStateToProps, { getProductDetails, formatTable })(form(SearchBar))
);
