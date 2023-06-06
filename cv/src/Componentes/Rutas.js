import { Routes, Route } from 'react-router-dom';
import AcercaDe from './AcercaDe';


function Rutas () {
  return (
    <Routes>
      <Route path="acercaDe" element={ <AcercaDe /> } />
      {/* <Route path="contacto" element={ <Contacto /> } />
      <Route path="/" element={ <HomePage /> } /> */}
    </Routes>
  );
}

export default Rutas;