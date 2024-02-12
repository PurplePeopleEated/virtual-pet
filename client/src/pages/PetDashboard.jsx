const PetDashboard = ({ pet }) => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>{pet.name}'s Profile</h1>
        <div className="pet-info">
          <img src={pet.image} alt={pet.name} />
          <p><strong>Name:</strong> {pet.name}</p>
          <p><strong>Species:</strong> {pet.species}</p>
          <p><strong>Birthday:</strong> {pet.birthday}</p>
          <p><strong>Hunger:</strong> {pet.hunger}</p>
          <p><strong>Happiness:</strong> {pet.happiness}</p>
          <p><strong>Last Fed:</strong> {pet.lastFed}</p>
          <p><strong>Last Played:</strong> {pet.lastPlayed}</p>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1>My Pet App</h1>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/stats">Stats</a></li>
          <li><a href="/otherpets">Other Pets</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default PetDashboard;