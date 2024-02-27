import React, { useState } from 'react';
import {handleCreateRow} from '../components/createRow';

const EditableTable = () => {
  const [table, setTable] = useState([Array(2).fill(null), Array(2).fill(null)]);
  const [newRowName, setNewRowName] = useState('');
  // const addRow = () => {
  //   // Call handleCreateRow to create a new entity with null values
  //   handleCreateRow().then(() => {
  //     // Update the table state after successful row creation
  //     setTable([...table, Array(table[0].length).fill(null)]);
  //   });
  // };
  const handleAddRow = () => {
    // Pass the newRowName to handleCreateRow
    handleCreateRow(newRowName);
    // Clear the newRowName input after adding
    setNewRowName('');
  };
  
  const addColumn = () => {
    setTable(table.map(row => [...row, null]));
  };

  const deleteColumn = () => {
    const columnName = prompt('Enter the column name');
    const columnIndex = table[0].indexOf(columnName);
    if (columnIndex !== -1) {
      setTable(table.map(row => row.filter((_, index) => index !== columnIndex)));
    }
  };

  const updateCell = (rowIndex, columnIndex, value) => {
    const newTable = [...table];
    newTable[rowIndex][columnIndex] = value;
    setTable(newTable);
  };

  return (
    <div >
      <div className="container mx-auto p-6">

        <table className="min-w-full bg-white rounded-lg shadow-md">
          <tbody>
            {table.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex === 0 ? 'bg-blue-200' : ''}>
                {row.map((cell, columnIndex) => (
                  <td key={columnIndex} className="py-4 px-6 border-b border-gray-200">
                    <input
                     className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     type="text"
                     placeholder="Enter new row name"
                     value={newRowName}
                     onChange={(e) => setNewRowName(e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
        <button className="mt-4 bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleAddRow}>
        Add Row
      </button>
        <button className="mt-4 m-1 bg-black hover:bg-red-700  text-white font-bold py-2 px-4 rounded-full" onClick={addColumn}>Add Column</button>
        <button className="mt-4 m-1 bg-black hover:bg-red-700  text-white font-bold py-2 px-4 rounded-full" onClick={deleteColumn}>Delete Column</button>
        <button className="mt-4 m-1 bg-black hover:bg-red-700  text-white font-bold py-2 px-4 rounded-full" onClick={deleteColumn}>Delete Row</button>

      </div>
    </div>
  );
};

export default EditableTable;
