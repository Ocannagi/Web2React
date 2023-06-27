import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Formulario from './Formulario';

function Listado() {
  const [carreras, setCarreras] = useState(null);
  const [edicionSeleccionada, setEdicionSeleccionada] = useState(null);

  useEffect(() => {
    listar();
  }, []);

  const listar = () => {
    axios.get('http://localhost:3001/carreras')
      .then((response) => {
        response.data.forEach(function (x) { x.fecha = new Date(x.fecha) });
        setCarreras(response.data)
      })
      .catch((error) => {
        console.log(error);
        setCarreras([]);
      });
  };

  const botonEditar = (unaCarrera) => {
    axios.get(`http://localhost:3001/carreras/${unaCarrera.id}`)
      .then((response) => {
        setEdicionSeleccionada(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const botonAgregar = () => {
    setEdicionSeleccionada({}); // regalo
  };

  const botonBorrar = (unaCarrera) => {
    if (window.confirm('¿Está seguro de querer borrar la carrera?')) {
      axios.delete(`http://localhost:3001/carreras/${unaCarrera.id}`)
        .then((response) => {
          console.log(response)
          listar();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const formularioDescartado = () => {
    setEdicionSeleccionada(null); // regalo
  };

  return (
    <>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="text-center">Carrera</th>
              <th scope="col" className="text-center">Lugar</th>
              <th scope="col" className="text-center">Fecha</th>
              <th scope="col" className="text-center">Vueltas</th>
              <th scope="col" className="text-center">Pilotos</th>
              <th scope="col" className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carreras &&
              carreras.map((carrera, index) => (
                <tr key={index}>
                  <td className="text-center">{carrera.nombre}</td>
                  <td className="text-center">{carrera.lugar}</td>
                  <td className="text-center">{carrera.fecha.toLocaleDateString()} -
                    {carrera.fecha.toLocaleTimeString().substr(0, 5)}hs.</td>
                  <td className="text-center">{carrera.vueltas}</td>
                  <td className="text-center">{carrera.cantidadPilotos}</td>
                  <td className="text-center text-nowrap">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={() => botonEditar(carrera)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="ms-1 btn btn-sm btn-danger"
                      onClick={() => botonBorrar(carrera)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button type="button" className="ms-2 btn btn-sm btn-secondary" onClick={() => botonAgregar()}>
          Agregar carrera
        </button>
      </div>
      <hr />
      {edicionSeleccionada && (<Formulario edicionSeleccionada={edicionSeleccionada} onDescartar={formularioDescartado} onCambio={listar} />)}
    </>
  );
}

export default Listado;
