import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import {
  decrementProductQuantity,
  removeItemFromTable
} from '../actions/index';

import styles from './table.scss';

export class ProductTable extends React.PureComponent {
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
            accessor: 'departmentId',
            minWidth: 100,
            Cell: props => `${props.row.departmentId} - ${props.row.department}`
          },
          {
            Header: 'Department',
            accessor: 'department',
            show: false
          },
          {
            Header: 'Class',
            accessor: 'classId',
            minWidth: 50
          },
          {
            Header: 'SKU',
            accessor: 'sku',
            minWidth: 75
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
            accessor: 'upc',
            minWidth: 120
          },
          {
            Header: 'Quantity',
            accessor: 'quantity',
            filterable: false,
            minWidth: 75
          }
        ]
      },
      {
        Header: 'Actions',
        headerClassName: 'hide-on-print',
        columns: [
          {
            Header: 'Remove',
            headerClassName: 'hide-on-print',
            filterable: false,
            Cell: props =>
              <button
                className="remove-btn"
                onClick={() => this.removeItem(props.row.upc)}
              >
                {' '}REMOVE
              </button>
          },
          {
            Header: '-1',
            headerClassName: 'hide-on-print',
            filterable: false,
            Cell: props =>
              <button
                className="decrement-btn"
                onClick={() => this.decrementQuantity(props.row.upc)}
              >
                -1
              </button>
          }
        ]
      }
    ];

    return (
      <ReactTable
        className="-striped -highlight"
        data={products}
        columns={columns}
        defaultPageSize={10}
        filterable={true}
        resizable={true}
        sortable={false}
        showPagination={false}
      />
    );
  }
}

const mapStateToProps = state => ({
  products: state.table.products
});

export default withRouter(
  connect(mapStateToProps, { decrementProductQuantity, removeItemFromTable })(
    ProductTable
  )
);
