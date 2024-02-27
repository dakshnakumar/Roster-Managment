import { gql, useMutation, useQuery } from '@apollo/client';

const CREATE_ROW_MUTATION = gql`
  mutation createRow($rosterId: Int!, $name: String!) {
    createEntity(rosterId: $rosterId, name: $name) {
      id
      name
    }
  }
`;
const GET_CURRENT_ROSTER_ID = gql`
  query getCurrentRosterId {
    currentRoster {
      id
    }
  }
`;

function CreateRow() {
    const [getCurrentRosterId, { loading: rosterLoading, error: rosterError, data: rosterData }] = useQuery(GET_CURRENT_ROSTER_ID);
    const [createRow, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_ROW_MUTATION);
  
    // Handle loading and error states for both queries and mutations
  
    const handleCreateRow = (newRowName) => {
      const currentRosterId = rosterData?.currentRoster?.id;
  
      if (currentRosterId) {
        createRow({ variables: { rosterId: currentRosterId, name: newRowName } })
          .then((data) => {
            // ... handle successful row creation
          })
          .catch((error) => {
            // ... handle error
          });
      } else {
        console.error("Error fetching current roster ID:", rosterError);
      }
    };
  
    // ... (render UI elements and handle button click)
  
    return (
      <div>
        {/* ... (UI elements) */}
        <button onClick={() => handleCreateRow(newRowName)}>Create Row</button>
        {rosterLoading && <p>Loading roster...</p>}
        {mutationLoading && <p>Creating row...</p>}
        {rosterError && <p>Error fetching roster ID: {rosterError.message}</p>}
        {mutationError && <p>Error creating row: {mutationError.message}</p>}
      </div>
    );
  }
