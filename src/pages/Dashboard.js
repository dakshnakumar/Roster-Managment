import styles from '../styles/pages/Dashboard.module.css';
import { useQuery,gql,useSubscription } from '@apollo/client';
import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const GET_QUERY = gql`
query MyQuery {
  values {
    col_3
    col_2
    col_1
  }
}

`

const Dashboard = () => {
  const { user } = useOutletContext();
  const { data } = useQuery(GET_QUERY);
  console.log("data",data);
  return (
    <div>
      {!data? (<div>No data</div>
      ):(<ul>{data.values.map((todo)=>{
        return<li>{todo.col_3 };{todo.col_2};{todo.col_1}</li>
      })}</ul>)}
    </div>
      
  );
};

export default Dashboard;
