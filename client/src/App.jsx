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
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className='container'>
        <Outlet />
      </main>
    </>
  )
}

export default App
