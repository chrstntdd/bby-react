import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import propTypes from 'prop-types';

export class ProductReactTable extends React.PureComponent {
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
            filterable: false
          },
          {
            Header: '-1',
            filterable: false
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

export default withRouter(connect(mapStateToProps)(ProductReactTable));
