import React, { useState } from 'react';
import NavBar from './NavBar';

const Roster = () => {
    const [data, setData] = useState([
      { name: null, shifts: [null, null, null] },
    ]);
  
    const [days, setDays] = useState(['Day 1', 'Day 2', 'Day 3']);
  const [tableName, setTableName] = useState('Table 1');

  const addRow = () => {
    setData([...data, { name: 'New Employee', shifts: new Array(days.length).fill('') }]);
  };

  const deleteRow = () => {
    const name = prompt('Enter the employee name');
    setData(data.filter(d => d.name !== name));
  };

const addColumn = () => {
    const day = `Day ${days.length + 1}`; // Automatically generate the day name
    setDays([...days, day]);
    setData(data.map(d => ({ ...d, shifts: [...d.shifts, ''] })));
  };

  const deleteColumn = () => {
    const day = prompt('Enter the day name');
    if (day) {
      const index = days.findIndex(d => d && d.toLowerCase() === day.toLowerCase());
      if (index > -1) {
        setDays(days.filter((_, i) => i !== index));
        setData(data.map(d => ({ ...d, shifts: d.shifts.filter((_, i) => i !== index) })));
      }
    } else {
      alert('Please enter a valid day name.');
    }
  };
  
  return (
    <div>
        <NavBar tableName={tableName} />
    <div className="container mx-auto p-6">

      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-gray-300 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">Name</th>
            {days.map((day, index) => (
              <th key={index} className="py-4 px-6 bg-gray-300 font-bold uppercase text-sm text-gray-600 border-b border-gray-200">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <tr key={index}>
              <td className="py-4 px-6 border-b border-gray-200">
                <input
                  type="text"
                  value={d.name}
                  onChange={e => {
                    const newData = [...data];
                    newData[index] = { ...d, name: e.target.value };
                    setData(newData);
                  }}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </td>
              {d.shifts.map((shift, i) => (
                <td key={i} className="py-4 px-6 border-b border-gray-200">
                  <input
                    type="text"
                    value={shift}
                    onChange={e => {
                      const newShifts = [...d.shifts];
                      newShifts[i] = e.target.value;
                      const newData = [...data];
                      newData[index] = { ...d, shifts: newShifts };
                      setData(newData);
                    }}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} className="mt-4 bg-black hover:bg-red-700  text-white font-bold py-2 px-4 rounded-full">Insert Row</button>
      <button onClick={deleteRow} className="mt-4 bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-4">Delete Row</button>
      <button onClick={addColumn} className="mt-4 bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-4">Insert Column</button>
      <button onClick={deleteColumn} className="mt-4 bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-4">Delete Column</button>
    </div>
    </div>
  );
};

export default Roster;
