import React, { useEffect, useState } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import './index.css';
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx';



function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ bars, setBars ] = useState([]);
  const [ ratings, setRatings ] = useState([]);

  const checkAuth = () => {
    return sessionStorage.getItem('authToken') !== null;
  }

  useEffect(() => {
    setIsLoggedIn(checkAuth());
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/bars")
      .then(response => response.json())
      .then(data => setBars(data))
      .catch(error => console.error('Error fetching bars', error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/ratings")
      .then(response => response.json())
      .then(data => setRatings(data))
      .catch(error => console.error('Error fetching ratings', error));
  }, []);


  return (
    <>
      <header>
        <NavBar bars={bars} />
      </header>
      <main className='container'>
        {isLoggedIn ? (
          <Outlet ratings={ratings} context={[bars, setBars, ratings, setRatings]} />
        ) : (
          <Home />
        )}
      </main>
    </>
  )
}

export default App