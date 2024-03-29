import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

// Import main pages
import Error from './pages/Error';
import Login from './pages/Login';
import PetSelection from './pages/PetSelection';
import PetDashboard from './pages/PetDashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />
      }, {
        path: '/petselection',
        element: <PetSelection />
      }, {
        path: '/petdashboard',
        element: <PetDashboard />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);