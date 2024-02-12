import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER, LOGIN_USER } from '../utils/mutations.js'; 
import AuthService from '../utils/auth.js';

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

    if (!email || !password || (isSignUp && !username)) {
      console.error('Please fill in all required fields.');
      return;
    }

    try {
      if (isSignUp) {
        // Execute the sign-up mutation
        const { data } = await createUser({
          variables: {
            username,
            email,
            password,
          },
        });

        // Handle successful sign-up
        console.log('Sign-up successful!', data);
        
        await handleLogin(email, password, true);
      } else {
        // Handle login directly
        await handleLogin(email, password);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async (email, password, isSignUp = false) => {
    console.log('Email:', email);
    console.log('Password:', password);

        // Execute the login mutation
        try {
          const { data } = await loginUser({
            variables: {
              email,
              password,
            },
          });

        // Handle successful login
        console.log('Login successful!', data);

        AuthService.login(data.loginUser.token);

        if (isSignUp) {
          window.location.href = '/petselection'; // Redirect to pet selection page after sign-up
        } else {
          // Redirect to pet dashboard if the user has pets
          if (data.loginUser.hasPets) {
            window.location.href = '/petdashboard';
          } else {
            // Redirect to pet selection if the user doesn't have pets
            window.location.href = '/petselection';
          }
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