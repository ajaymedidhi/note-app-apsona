import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Progress from './components/Progress'
import Deleted from './components/Deleted';
import Archived from './components/Archived';
import N from './components/N';

const App = () => {
  return (
    <BrowserRouter> 
      <Routes>
         <Route exact path="/" element={<Home />} />
         <Route exact path="/login" element={<Login />} /> 
         <Route exact path="/signup" element={<Register/>} /> 
         <Route exact path="/update" element={<Progress/>}/> 
         <Route exact path="/deleted" element={<Deleted/>}/> 
         <Route exact path="/archive" element={<Archived/>}/>
         <Route exact path="/notes" element={<N/>}/>
       </Routes>
    </BrowserRouter>
  );
};

export default App;
