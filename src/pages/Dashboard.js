// import styles from '../styles/pages/Dashboard.module.css';
// import { useQuery,gql,useSubscription } from '@apollo/client';
// import { useOutletContext } from 'react-router-dom';
// import { Helmet } from 'react-helmet';

// const GET_QUERY = gql`
// query MyQuery {
//   values {
//     col_3
//     col_2
//     col_1
//   }
// }

// `

// const Dashboard = () => {
//   const { user } = useOutletContext();
//   const { data } = useQuery(GET_QUERY);
//   console.log("data",data);
//   return (
//     <div>
//       {!data? (<div>No data</div>
//       ):(<ul>{data.values.map((todo)=>{
//         return<li>{todo.col_3 } {todo.col_2} {todo.col_1}</li>
//       })}</ul>)}
//     </div>
      
//   );
// };

// export default Dashboard;


import React, { useState } from 'react';
import { useQuery, gql, useMutation,useSubscription } from '@apollo/client';
import { useOutletContext } from 'react-router-dom';

const GET_QUERY = gql`
  subscription MyQuery {
    values {
      col_1
      col_2
      col_3
    }
  }
`;

const ADD_COLUMN_MUTATION = gql`
  mutation AddColumn($columnName: String!) {
    addColumn(columnName: $columnName)
  }
`;

const Dashboard = () => {
  const { user } = useOutletContext();
  const { loading, error, data } = useSubscription(GET_QUERY);
  const [addColumn ] = useMutation(ADD_COLUMN_MUTATION);
  const [newColumnName,setNewColumnName] = useState("");

  const handleAddColumn = async () => {
    if (newColumnName) {
      try {
        const { data } = await addColumn({ // Use addColumn directly
          variables: { 
            columnName: newColumnName },
        });
        // Handle successful column addition (e.g., refresh data, display a success message)
      } catch (error) {
        // Handle any errors that occur during column addition
      }
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <table>
          <thead>
            <tr>
              {/* Dynamically create header cells for each column */}
              {Object.keys(data.values[0]).map((columnName) => (
                <th key={columnName}>{columnName}</th>
              ))}
              <th>Add Column</th>
            </tr>
          </thead>
          <tbody>
            {data.values.map((row) => (
              <tr key={row.id || row._id}> {/* Assuming a unique row identifier */}
                {/* Render each column value from the row */}
                {Object.values(row).map((value) => (
                  <td key={value}>{value}</td>
                ))}
                <td>
                  <input
                    type="text"
                    value={newColumnName}
                    onChange={(e)=> setNewColumnName(e.target.value)}
                  />
                  <button onClick={handleAddColumn}>Add</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;




