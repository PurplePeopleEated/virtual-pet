const PetSelection = ({ pets, onSelectPet }) => {
  return (
    <div>
      <h2>Choose Your Pet</h2>
      <div className="pet-list">
        {pets.map(pet => (
          <div key={pet.id} className="pet-item">
            <img src={pet.image} alt={pet.name} />
            <h3>{pet.name}</h3>
            <button onClick={() => onSelectPet(pet)}>Select</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetSelection;