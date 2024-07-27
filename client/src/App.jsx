import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './index.css';
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx';



function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ ratings, setRatings ] = useState([]);

  const checkAuth = () => {
    return sessionStorage.getItem('authToken') !== null;
  }

  useEffect(() => {
    setIsLoggedIn(checkAuth());
  }, []);


  useEffect(() => {
    fetch("http://127.0.0.1:5555/ratings")
      .then(response => response.json())
      .then(data => setRatings(data))
      .catch(error => console.error('Error fetching bars', error));
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className='container'>
        {isLoggedIn ? (
          <Outlet ratings={ratings} />
        ) : (
          <Home />
        )}
      </main>
    </>
  )
}

export default App