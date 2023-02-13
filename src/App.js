import './App.css';
import React from 'react';
import MovieDB from './pages/movieDB/MovieDB';
import Navbar from './layout/navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <MovieDB />
    </>
  )
}

export default App;


// Packages installed:
// "axios": "^0.24.0",