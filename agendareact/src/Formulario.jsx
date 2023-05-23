import React, { Component } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


class Formulario extends Component {
  constructor(props) {
    super(props);
    this.editarEvento = props.editarEvento;
  }

  render() {
    return (
      <div>
        <form>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre del evento</label>
            <input type="text" className="form-control" id="nombre" />
          </div>
          <div className="mb-3">
            <label htmlFor="lugar" className="form-label">Lugar</label>
            <input type="text" className="form-control" id="lugar" />
          </div>
          <div className="mb-3">
            <label htmlFor="fecha" className="form-label">Fecha y hora</label>
            <input type="datetime-local" className="form-control" id="fecha" />
          </div>
          <div className="mb-3">
            <label htmlFor="organizador" className="form-label">Organizador</label>
            <input type="text" className="form-control" id="organizador" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Contacto</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <button type="submit" className="btn btn-primary">Guardar</button>
          <button type="reset" className="ms-1 btn btn-secondary">Descartar</button>
        </form>
      </div>
    );
  }
}

export default Formulario;
