import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from '../utils/mutations';

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
  const [logoutUser] = useMutation(LOGOUT_USER);

  const handleLogout = async () => {
    try {
      await logoutUser();

      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <h1>My Pet App</h1>
        <ul className="nav-links">
        <li><Link to="/petdashboard">Home</Link></li>
          <li><Link to="/stats">Stats</Link></li>
          <li><Link to="/otherpets">Other Pets</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default PetDashboard;