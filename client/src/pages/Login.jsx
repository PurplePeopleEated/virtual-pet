import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations.js'; 

const Login = () => {
  // State to hold user input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to determine if it's a sign-up or login
  const [username, setUsername] = useState('');

  // Define the mutation hook
  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data to be sent to the server
    const userData = {
      email,
      password,
      username,
    };

    try {
      if (isSignUp) {
        // Execute the mutation
        const { data } = await createUser({
          variables: {
            ...userData,
          },
        });

        // Handle successful sign-up
        console.log('Sign-up successful!', data);
      } else {
        // Handle login logic
       
      }
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  return (
    <div>
      <div>
        <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
        <form onSubmit={handleSubmit}>
        {isSignUp && ( // Render username field only for sign-up
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
          )}
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
          <button type="submit" disabled={loading}>{isSignUp ? 'Sign Up' : 'Login'}</button>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
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