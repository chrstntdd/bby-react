import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { getProductsFromStore } from '../actions';
import propTypes from 'prop-types';

export class ProductReactTable extends React.Component {
  constructor(props) {
    super(props);
    this.props.getProductsFromStore();
  }

  render() {
    const data = [
      {
        name: 'Apple - Apple Pencil for iPad Pro - White',
        sku: 4538802,
        upc: '888462313674',
        department: 'COMPUTERS',
        departmentId: 6,
        modelNumber: 'MK0C2AM/A',
        classId: 492,
        quantity: 5
      },
      {
        name: 'Apple - TEST TEST TEST',
        sku: 9234812,
        upc: '719284372618',
        department: 'APPLIANCES',
        departmentId: 7,
        modelNumber: 'T3ST071/B',
        classId: 420,
        quantity: 2
      },
      {
        name: 'Apple - WEST TEST NEST',
        sku: 9175320,
        upc: '817347123934',
        department: 'TABLETS',
        departmentId: 3,
        modelNumber: 'T3ST05',
        classId: 666,
        quantity: 12
      }
    ];

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
            data={data}
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

export default withRouter(
  connect(mapStateToProps, { getProductsFromStore })(ProductReactTable)
);
