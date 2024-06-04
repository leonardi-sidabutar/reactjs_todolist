//import react
import React from 'react';
//import react router dom
import { Routes, Route } from "react-router-dom";

//import component Register
import Register from './pages/register';

//import component Login
import Login from './pages/login';

//import component Register
import Dashboard from './pages/dashboard';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;