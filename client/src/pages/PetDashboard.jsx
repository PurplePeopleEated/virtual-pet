import { useMutation } from "@apollo/client";
import React from 'react';
import { UPDATE_PET_HUNGER, UPDATE_PET_LAST_PLAYED } from "../utils/mutations";

const PetDashboard = () => {
  const [feedPet] = useMutation(UPDATE_PET_HUNGER);
  const [playWithPet] = useMutation(UPDATE_PET_LAST_PLAYED);

  const handleFeedPet = async () => {
    try{
      await feedPet({
        variables: {
          id: 1,
          hunger: 10
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayWithPet = async () => {
    try{
      await playWithPet({
        variables: {
          id: 1,
          lastPlayed: "Date.now()"
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  
  
  
  
  
  
  
  
  
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl mb-4 font-semibold">Pet Dashboard</h1>
      <div className="mb-4 text-center">
        <p className="text-3xl mb-4 font-semibold">Pet Name</p>
        <p className="text-xl mb-4 font-semibold">Hunger:</p>
        <p className="text-xl mb-4 font-semibold">Last Played:</p>
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