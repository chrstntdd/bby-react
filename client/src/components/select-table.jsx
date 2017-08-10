import React from 'react';

/* receive all table instances, referenced by Id, displayed by date. Load on select */

const SelectTable = props => {
  return (
    <select
      name="select"
      id="select"
      onChange={{
        /* call something */
      }}
    >
      {props.userTables.map((tableData, index) =>
        <option key={index} value={tableData._id}>
          {tableData.formattedDate}
        </option>
      )}
    </select>
  );
};

export default SelectTable;
