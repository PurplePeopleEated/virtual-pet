import React, { useState } from 'react';

const Login = () => {
  // State to hold user input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to determine if it's a sign-up or login

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data to be sent to the server
    const userData = {
      email,
      password,
    };

    try {
      if (isSignUp) {
        // Handle sign-up logic
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        // Handle successful sign-up, e.g., redirect to dashboard
      } else {
        // Handle login logic
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        // Handle successful login, e.g., store authentication token
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error, e.g., display error message to the user
    }
  };

  return (
    <div>
      <div>
        <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
        </form>
        <p>
          {isSignUp
            ? 'Already have an account?'
            : 'Don\'t have an account?'}
          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
