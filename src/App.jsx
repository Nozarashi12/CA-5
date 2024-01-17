import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './assets/Components/Home';
import Form from './assets/Components/Form';
import './App.css';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form' element={<Form />} />
      </Routes>
      
    </div>
  );
}

export default App;
