import React from 'react';
import { Outlet } from 'react-router-dom';
import './index.css';
import NavBar from './components/NavBar.jsx'



function App() {

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
