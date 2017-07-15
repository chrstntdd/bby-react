import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import propTypes from 'prop-types';
import {
  decrementProductQuantity,
  removeItemFromTable
} from '../actions/index';

export class ProductReactTable extends React.PureComponent {
  removeItem(upc) {
    this.props.removeItemFromTable(upc);
  }

  decrementQuantity(upc) {
    this.props.decrementProductQuantity(upc);
  }
  render() {
    const { products } = this.props;

    const columns = [
      {
        Header: 'Product Information',
        columns: [
          {
            Header: 'Department',
            accessor: 'department'
          },
          {
            Header: 'Class',
            accessor: 'classId'
          },
          {
            Header: 'SKU',
            accessor: 'sku'
          },
          {
            Header: 'Model Number',
            accessor: 'modelNumber'
          },
          {
            Header: 'Name',
            accessor: 'name'
          },
          {
            Header: 'UPC',
            accessor: 'upc'
          },
          {
            Header: 'Quantity',
            accessor: 'quantity',
            filterable: false
          }
        ]
      },
      {
        Header: 'Actions',
        columns: [
          {
            Header: 'Remove',
            filterable: false,
            Cell: props =>
              <button onClick={() => this.removeItem(props.row.upc)}>
                {' '}REMOVE
              </button>
          },
          {
            Header: '-1',
            filterable: false,
            Cell: props =>
              <button onClick={() => this.decrementQuantity(props.row.upc)}>
                -1
              </button>
          }
        ]
      }
    ];

    return (
      <div>
        <div className="table-wrap">
          <ReactTable
            className="-striped -highlight"
            data={products}
            columns={columns}
            defaultPageSize={10}
            filterable={true}
            resizable={true}
            sortable={true}
            style={{
              height: '400px' // This will force the table body to overflow and scroll, since there is not enough room
            }}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <br />
          <em>Tip: Hold shift when sorting to multi-sort!</em>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.table.products
});

export default withRouter(
  connect(mapStateToProps, { decrementProductQuantity, removeItemFromTable })(
    ProductReactTable
  )
);
