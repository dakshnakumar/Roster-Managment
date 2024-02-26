import styles from '../styles/pages/Dashboard.module.css';
import { useQuery,gql,useSubscription } from '@apollo/client';
import { useOutletContext } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const GET_QUERY = gql`
query MySubscription {
  rosters {
    title
    entites {
      name
      items {
        name
      }
    }
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
      ):(<ul>{data.rosters.map((todo)=>{
        return<li>{todo.rosters}</li>
      })}</ul>)}
    </div>
      
  );
};

export default Dashboard;
