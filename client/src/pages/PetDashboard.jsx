import { useMutation } from "@apollo/client";
import React, { useState } from 'react';
import { UPDATE_PET_HUNGER, UPDATE_PET_LAST_PLAYED } from "../utils/mutations";

const PetDashboard = () => {
  const [feedPet] = useMutation(UPDATE_PET_HUNGER);
  const [playWithPet] = useMutation(UPDATE_PET_LAST_PLAYED);

  const [user, setUser] = useState({
    name: "lil gooberoni",
    hunger: 50,
    lastPlayed: "2024-02-11T16:00:00.000Z"
  });

  const handleFeedPet = async () => {
    try {
      const newHungerValue = user.hunger + 10;
      await feedPet({
        variables: {
          id: 1,
          hunger: newHungerValue
        },
      });
      setUser(prevUser => ({ ...prevUser, hunger: newHungerValue }));
    } catch (error) {
      console.error(error);
    }
  };
  
  const handlePlayWithPet = async () => {
    try {
      const newLastPlayed = Date.now();
      await playWithPet({
        variables: {
          id: 1,
          lastPlayed: newLastPlayed
        },
      });
      setUser(prev => ({ ...prev, lastPlayed: newLastPlayed }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl mb-4 font-semibold">Pet Dashboard</h1>
      <div className="mb-4 text-center">
        <p className="text-3xl mb-4 font-semibold">{user.name}</p>
        <p className="text-xl mb-4 font-semibold">Hunger: {user.hunger}</p>
        <p className="text-xl mb-4 font-semibold">Last Played: {user.lastPlayed}</p>
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
