import React from 'react';
import { connect } from 'react-redux';
import { loadTable } from '../actions';
import { withRouter } from 'react-router-dom';

/* receive all table instances, referenced by Id, displayed by date. Load on select */

export class SelectTable extends React.Component {
  handleSelectTableToLoad(e, userTables) {
    /* filter through the userTables in props, 
     * to match the formatted date with the correct tableId 
     */
    const tableIdToLoad = userTables.filter(tableInstance => {
      return tableInstance.formattedDate === e.target.value;
    });
    this.props.loadTable(tableIdToLoad[0].tableId);
  }
  render(props) {
    const { userTables, loadedTable } = this.props;

    return (
      <select
        name="select"
        id="select"
        onChange={e => this.handleSelectTableToLoad(e, userTables)}
      >
        <option disabled selected value>
          {' '}-- Select a table --{' '}
        </option>
        {userTables.map((tableData, index) =>
          <option key={index} value={tableData._id}>
            {tableData.formattedDate}
          </option>
        )}
      </select>
    );
  }
}

const mapStateToProps = state => ({
  userTables: state.table.selectOptionData,
  loadedTable: state.table.loadedTable
});

export default withRouter(
  connect(mapStateToProps, {
    loadTable
  })(SelectTable)
);
