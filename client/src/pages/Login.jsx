import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER, LOGIN_USER } from '../utils/mutations.js'; 

const Login = () => {
  // State to hold user input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // State to determine if it's a sign-up or login
  const [username, setUsername] = useState('');

  // Define the mutation hooks
  const [createUser, { loading: signUpLoading, error: signUpError }] = useMutation(CREATE_USER);
  const [loginUser, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_USER); // Use useMutation for mutations

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        // Execute the sign-up mutation
        const { data } = await createUser({
          variables: {
            email,
            password,
            username,
          },
        });

        // Handle successful sign-up
        console.log('Sign-up successful!', data);
      } else {
        // Execute the login mutation
        const { data } = await loginUser({
          variables: {
            email,
            password,
          },
        });

        // Handle successful login
        console.log('Login successful!', data);
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
          <button type="submit" disabled={isSignUp ? signUpLoading : loginLoading}>
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
          {(signUpLoading || loginLoading) && <p>Loading...</p>}
          {(signUpError || loginError) && <p>Error: {signUpError ? signUpError.message : loginError.message}</p>}
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
