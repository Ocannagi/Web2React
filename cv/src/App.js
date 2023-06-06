import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Rutas from './Componentes/Rutas';
import Navbar from './Componentes/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Rutas />
    </BrowserRouter>
  );
}

export default App;

