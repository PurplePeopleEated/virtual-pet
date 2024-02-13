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
    <div className="p-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-4">{isSignUp ? 'Sign Up' : 'Login'}</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            {isSignUp && ( // Render username field only for sign-up
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="w-full px-3 text-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isSignUp ? signUpLoading : loginLoading}
              >
                {isSignUp ? 'Sign Up' : 'Login'}
              </button>
              {(signUpLoading || loginLoading) && <p>Loading...</p>}
            </div>
          </div>
        </form>
        {(signUpError || loginError) && <p className="text-red-500 text-xs italic">Error: {signUpError ? signUpError.message : loginError.message}</p>}
        <p className="text-center text-sm">
          {isSignUp
            ? 'Already have an account?'
            : 'Don\'t have an account?'}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500 hover:text-blue-800">
            &nbsp;{isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;