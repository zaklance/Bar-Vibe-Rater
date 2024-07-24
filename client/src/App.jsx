import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './index.css';
import NavBar from './components/NavBar.jsx'
import Home from './components/Home.jsx';



function App() {
  // const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  // const checkAuth = () => {
  //   return localStorage.getItem('authToken') !== null;
  // }

  // useEffect(() => {
  //   setIsLoggedIn(checkAuth());
  // }, []);

//   {isLoggedIn ? 

//   isLoggedIn = { isLoggedIn } setIsLoggedIn = { setIsLoggedIn }
// {isLoggedIn ? 
//   : <Home />}

  const [ratings, setRatings] = useState([]);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/ratings")
      .then(response => response.json())
      .then(data => setRatings(data))
      .catch(error => console.error('Error fetching bars', error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/favorites")
      .then(response => response.json())
      .then(data => {
        const filteredData = data.filter(item => item.user_id === parseInt(globalThis.localStorage.getItem('user_id')));
        setFavs(filteredData)
      })
      .catch(error => console.error('Error fetching favorites', error));
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className='container'>
        <Outlet ratings={ratings} favs={favs} />
      </main>
    </>
  )
}

export default App
