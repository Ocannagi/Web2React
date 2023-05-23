import React, {useState} from 'react';
import Listado from './Listado'
import Formulario from './Formulario'

function App() {
  let misEventos = [
    {
      nombre: 'Mundial de esquí',
      lugar: 'San Carlos de Bariloche',
      fecha: new Date('2023-07-15T10:00:00'),
      organizador: 'Comité mundial de esquí',
      contacto: 'worldcup@wsc.com',
    },
    {
      nombre: 'Conferencia de tecnología',
      lugar: 'Ciudad de México',
      fecha: new Date('2023-09-20T14:30:00'),
      organizador: 'TechCon',
      contacto: 'info@techcon.com',
    },
    {
      nombre: 'Feria de arte',
      lugar: 'París',
      fecha: new Date('2023-08-10T11:00:00'),
      organizador: 'Museo de Arte Moderno',
      contacto: 'contacto@museoarte.com',
    },
    {
      nombre: 'Festival de música',
      lugar: 'Londres',
      fecha: new Date('2023-06-25T19:30:00'),
      organizador: 'MusicFest',
      contacto: 'info@musicfest.com',
    },
    {
      nombre: 'Exposición de fotografía',
      lugar: 'Nueva York',
      fecha: new Date('2023-10-05T13:00:00'),
      organizador: 'Galería de Arte Contemporáneo',
      contacto: 'galeriaarte@ny.com',
    },
    {
      nombre: 'Seminario de negocios',
      lugar: 'Tokio',
      fecha: new Date('2023-11-12T09:00:00'),
      organizador: 'Business Solutions',
      contacto: 'contacto@business.com',
    },
    {
      nombre: 'Feria de alimentos',
      lugar: 'Sidney',
      fecha: new Date('2023-09-05T12:30:00'),
      organizador: 'FoodExpo',
      contacto: 'info@foodexpo.com',
    },
  ];

  return (
    <main className="container">
      <h1 className="">Sistema de eventos</h1>
      <hr />
      <Listado eventos={misEventos} editarEvento={editarEvento} />
      <hr />
      <Formulario editarEvento={editarEvento}/>
    </main>
  );
}

export default App;
