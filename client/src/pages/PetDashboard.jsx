import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from 'react';
import { UPDATE_PET_HUNGER, UPDATE_PET_LAST_PLAYED } from "../utils/mutations";
import { GET_PETS_BY_USER } from "../utils/queries";
import AuthService from '../utils/auth';

const PetDashboard = () => {
  const [feedPet] = useMutation(UPDATE_PET_HUNGER);
  const [playWithPet] = useMutation(UPDATE_PET_LAST_PLAYED);
  const [pet, setPet] = useState(null);

  /*const { loading, error, data } = useQuery(GET_PET, {
    variables: { petId: AuthService.getUser().data.pet._id } // Pass the logged-in user's pet ID as a variable
  });*/

  //const { loading, error, data } = useQuery(GET_PETS_BY_USER);

  /*const [user, setUser] = useState({
    name: "lil gooberoni",
    hunger: 50,
    lastPlayed: "2024-02-11T16:00:00.000Z"
  });*/

  useEffect(() => {
    const token = AuthService.getToken();
    if (!token) {
      console.log('No token found. Redirecting to login page...');
      window.location.href = '/';
    }
  }, []);

  const { loading, error, data } = useQuery(GET_PETS_BY_USER, {
    variables: { userId: AuthService.getUser()?.data._id },
  });

  useEffect(() => {
    if (data && data.petsByUser.length > 0) {
      setPet(data.petsByUser[0]);
    }
  }, [data]);

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  }

  const handleFeedPet = async () => {
    try {
      const newHungerValue = pet.hunger + 10;
      console.log(pet._id);
      console.log(newHungerValue);
      await feedPet({
        variables: {
          _id: pet._id,
          hunger: newHungerValue
        },
      });
      setPet(prevPet => ({ ...prevPet, hunger: newHungerValue }));
    } catch (error) {
      console.error(error);
    }
  };
  
  const handlePlayWithPet = async () => {
    try {
      const newLastPlayed = Date.now().toString();
      console.log(pet._id);
      console.log(newLastPlayed);
      await playWithPet({
        variables: {
          _id: pet._id,
          lastPlayed: newLastPlayed
        },
      });
      setPet(prevPet => ({ ...prevPet, lastPlayed: newLastPlayed }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl mb-4 font-semibold">Pet Dashboard</h1>
      <div className="mb-4 text-center">
      {pet && (
          <>
            <p className="text-3xl mb-4 font-semibold">{pet.name}</p>
            <p className="text-xl mb-4 font-semibold">Hunger: {pet.hunger}</p>
            <p className="text-xl mb-4 font-semibold">Last Played: {formatDate(pet.lastPlayed)}</p>
          </>
        )}
        <img src="/images/pet.jpg" alt="Pet" className="rounded-full h-64 w-64 object-cover mx-auto" />
      </div>
      <div className="flex space-x-4 justify-center"> 
        <button onClick={handleFeedPet} className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded">Feed Pet</button>
        <button onClick={handlePlayWithPet} className="bg-purple-800 hover:bg-purple-900 text-white px-4 py-2 rounded">Play with Pet</button>
      </div>
    </div>
  );
};

export default PetDashboard;