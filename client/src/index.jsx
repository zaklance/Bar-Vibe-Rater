import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Vibes from './components/Vibes.jsx'
import Rater from './components/Rater.jsx'
import Favorites from './components/Favorites.jsx'
import './index.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "vibes",
        element: <Vibes />
      },
      {
        path: "rater",
        element: <Rater />
      },
      {
        path: "vibes/:id",
        element: <Vibes />
      },
      {
        path: "favorites",
        element: <Favorites />
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
