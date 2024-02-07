import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Virtual Pet</h1>
      <div>
        <Link to ="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;