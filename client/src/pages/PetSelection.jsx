//import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PET } from '../utils/mutations';
import { CURRENT_USER } from '../utils/queries';

const PetSelection = () => {
  //const [selectedPet, setSelectedPet] = useState(null);
  const { data: userData } = useQuery(CURRENT_USER);
  const [createPet] = useMutation(CREATE_PET);

  const handleSelectPet = async (species) => {
    const name = prompt(`Please enter a name for your new ${species}:`);
    if (name && userData && userData.currentUser) {
      try {
        await createPet({
          variables: {
            name,
            species,
            ownerId: userData.currentUser._id,
          },
        });
      } catch (error) {
        console.error('Error creating pet:', error);
      }
    }
  };

  return (
    <div>
      <h2>Choose Your Pet</h2>
      <div className="pet-list">
        {['dog', 'cat', 'rat'].map((species) => (
          <div key={species} className="pet-item">
            <img src={`images/${species}.jpg`} alt={species} />
            <h3>{species}</h3>
            <button onClick={() => handleSelectPet(species)}>Adopt</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetSelection;