import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio'),
  lugar: yup.string().required('El lugar es obligatorio'),
  fecha: yup.date().required('La fecha es obligatoria'),
  organizador: yup.string().required('El organizador es obligatorio'),
  contacto: yup.string().required('El contacto es obligatorio').email('Email incorrecto'),
});

const json = (obj) => {
  let cache=[]
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.includes(value)) return;
      cache.push(value);
    }
    return value;
  }, 4);
}

function Formulario (props) {
  const {eventoSeleccionado, onDescartar, onCambio} = props;
  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (eventoSeleccionado) {
      // Conversión de zona horaria
      let fecha = new Date(eventoSeleccionado.fecha);
      fecha.setHours(fecha.getHours() - 3);
      fecha = fecha.toISOString().substr(0, 22);

      // Relleno del formulario
      setValue('nombre', eventoSeleccionado.nombre);
      setValue('lugar', eventoSeleccionado.lugar);
      setValue('fecha', fecha); //
      setValue('organizador', eventoSeleccionado.organizador);
      setValue('contacto', eventoSeleccionado.contacto);
    }
  }, [eventoSeleccionado]);

  const resetForm = () => {
    setValue('nombre', null);
    setValue('lugar', null);
    setValue('fecha', null);
    setValue('organizador', null);
    setValue('contacto', null);
  }

  const enviar = (data) => {
    if (eventoSeleccionado && eventoSeleccionado.id) {
      axios.patch(`http://localhost:3001/eventos/${eventoSeleccionado.id}`, data)
        .then((response) => {
          resetForm();
          onCambio();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios.post(`http://localhost:3001/eventos`, data)
        .then((response) => {
          resetForm();
          onCambio();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(enviar)}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre del evento</label>
          <input type="text" className="form-control" id="nombre" {...register("nombre")} />
        </div>
        <div className="mb-3">
          <label htmlFor="lugar" className="form-label">Lugar</label>
          <input type="text" className="form-control" id="lugar" {...register("lugar")} />
        </div>
        <div className="mb-3">
          <label htmlFor="fecha" className="form-label">Fecha y hora</label>
          <input type="datetime-local" className="form-control" id="fecha" {...register("fecha", { valueAsDate: true })} />
        </div>
        <div className="mb-3">
          <label htmlFor="organizador" className="form-label">Organizador</label>
          <input type="text" className="form-control" id="organizador" {...register("organizador")} />
        </div>
        <div className="mb-3">
          <label htmlFor="contacto" className="form-label">Contacto</label>
          <input type="email" className="form-control" id="contacto" {...register("contacto")} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!isValid}>Guardar</button>
        <button type="reset" className="ms-1 btn btn-secondary" onClick={ onDescartar }>Descartar</button>
      </form>
    </div>
  );
}


export default Formulario;
