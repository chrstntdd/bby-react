import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import {
  decrementProductQuantity,
  removeItemFromTable,
  printTable,
  getPreviousTableData
} from '../actions/index';

import styles from './product-table.scss';

export class ProductTable extends React.PureComponent {
  componentDidMount() {
    this.props.getPreviousTableData();
  }
  removeItem(upc) {
    this.props.removeItemFromTable(upc);
  }

  decrementQuantity(upc) {
    this.props.decrementProductQuantity(upc);
  }
  render() {
    const { products, printing } = this.props;

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
            accessor: 'departmentId',
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
            accessor: 'name',
            minWidth: 200
          },
          {
            Header: 'UPC',
            accessor: 'upc',
            minWidth: 100
          },
          {
            Header: 'Quantity',
            accessor: 'quantity',
            minWidth: 50
          }
        ]
      },
      {
        Header: 'Actions',
        columns: [
          {
            Header: 'Remove',
            filterable: false,
            /* used to toggle visibility on print */
            show: !printing,
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
            filterable: false,
            /* used to toggle visibility on print */
            show: !printing,
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
        filterable={true}
        resizable={true}
        sortable={false}
        pageSize={`${!products || products.length < 10 ? 10 : products.length}`}
        showPagination={false}
        style={{
          height: `${printing ? 'initial' : '530px'}`
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  products: state.table.products,
  printing: state.table.printing
});

export default withRouter(
  connect(mapStateToProps, {
    decrementProductQuantity,
    removeItemFromTable,
    printTable,
    getPreviousTableData
  })(ProductTable)
);
