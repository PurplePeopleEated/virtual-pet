import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PET } from '../utils/mutations';
import { CURRENT_USER } from '../utils/queries';
import AuthService from '../utils/auth';

const PetSelection = ({ history }) => {
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState('');
  const [createPet] = useMutation(CREATE_PET);
  const { loading, error, data } = useQuery(CURRENT_USER);

  useEffect(() => {
    const token = AuthService.getToken();
    if(!token) {
      console.log('No token found. Redirecting to login page...');
      window.location.href = '/';
    }
  }, []);

  const handleCreatePet = async () => {
    try {
      const currentUser = AuthService.getUser();
      if (!currentUser) {
        throw new Error('Authentication required');
      }
      console.log(currentUser); // Get user profile from token
      const userId = currentUser.data._id;
      console.log(userId);

      // Send mutation with token
      const { data: petData } = await createPet({
        variables: {
          name: petName,
          species: species, // Assuming species is hardcoded for this example
          ownerId: userId, // Fill in the ownerId with the appropriate value
        },
      });      
      
      // Handle success response, e.g., show confirmation message
      console.log("Pet created:", petData.createPet);
      const redirect = () => {
        window.location.href = '/petdashboard';
      }

      redirect()
    } catch (error) {
      // Handle error, e.g., show error message
      console.error("Error creating pet:", error);
    }
  };

  return (
    <div>
      <h1>Pet Selection</h1>
      <div>
        <label>
          Choose a pet:
          <select value={species} onChange={(e) => setSpecies(e.target.value)}>
            <option value="null"></option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="rat">Rat</option>
          </select>
        </label>
      </div>
      <input 
        type="text" 
        placeholder="Enter pet name" 
        value={petName} 
        onChange={(e) => setPetName(e.target.value)} 
      />
      <button onClick={handleCreatePet}>Create Pet</button>
    </div>
  );
};



export default PetSelection;