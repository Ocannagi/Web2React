import React, { Component } from 'react';

class Listado extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="text-center">Evento</th>
              <th scope="col" className="text-center">Lugar</th>
              <th scope="col" className="text-center">Fecha</th>
              <th scope="col" className="text-center">Organizador</th>
              <th scope="col" className="text-center">Contacto</th>
              <th scope="col" className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">Fiesta de fin de año</td>
              <td className="text-center">Paraguay 1338, CABA</td>
              <td className="text-center">31/12/2023 - 21:00hs.</td>
              <td className="text-center">Ubaldo Carlos Estrada Saenz</td>
              <td className="text-center">uces@gmail.com</td>
              <td className="text-center text-nowrap">
                <button type="button" className="btn btn-sm btn-primary">Editar</button>
                <button type="button" className="ms-1 btn btn-sm btn-danger">Borrar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" className="ms-2 btn btn-sm btn-secondary">Agregar evento</button>
      </div>
    );
  }
}

export default Listado;