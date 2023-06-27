import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio'),
  lugar: yup.string().required('El lugar es obligatorio'),
  fecha: yup.date().required('La fecha es obligatoria'),
  vueltas: yup.number().required('Las vueltas son obligatorias').positive().integer(),
});

function Formulario (props) {
  const { edicionSeleccionada, onDescartar, onCambio } = props;
  const { register, handleSubmit, setValue, formState: { isValid } } = useForm({
    resolver: yupResolver(schema),
  });
  const [ pilotos, setPilotos ] = useState(null);

  useEffect(() => {
    listarOpciones();
    let fecha = null;
    if (edicionSeleccionada) {
      // Conversión de zona horaria
      if (edicionSeleccionada.fecha) {
        fecha = new Date(edicionSeleccionada.fecha);
        fecha.setHours(fecha.getHours() - 3);
        fecha = fecha.toISOString().substr(0, 22);
      }
      if (edicionSeleccionada.pilotos) {
        console.log(edicionSeleccionada.pilotos);
        edicionSeleccionada.pilotos = edicionSeleccionada.pilotos.map(function (p) { return p.id ? p.id.toString() : p });
      }

      setValue('nombre', edicionSeleccionada.nombre);
      setValue('lugar', edicionSeleccionada.lugar);
      setValue('fecha', fecha);
      setValue('vueltas', edicionSeleccionada.vueltas);
      setValue('pilotos',edicionSeleccionada.pilotos);


    }



  }, [edicionSeleccionada, setValue]);

  const listarOpciones = () => {
    // regalo
    axios
      .get('http://localhost:3001/pilotos')
      .then((response) => {
        setPilotos(response.data);
      })
      .catch((error) => {
        console.log(error);
        setPilotos([]);
      });
  };

  const resetForm = () => {
    setValue('nombre', null);
      setValue('lugar', null);
      setValue('fecha', null);
      setValue('vueltas', null);
      setValue('pilotos', null);
  }

  const enviar = (data) => {

    data.pilotos = data.pilotos.map(function (p) { return p ? parseInt(p) : p });

    if (edicionSeleccionada && edicionSeleccionada.id) {
      axios.patch(`http://localhost:3001/carreras/${edicionSeleccionada.id}`, data)
        .then((response) => {
          resetForm();
          onCambio();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(data);
      axios.post(`http://localhost:3001/carreras`, data)
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
          <label htmlFor="nombre" className="form-label">Nombre de la carrera</label>
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
          <label htmlFor="vueltas" className="form-label">Vueltas</label>
          <input type="number" min="1" className="form-control" id="vueltas" {...register("vueltas")} />
        </div>
        <div className="mb-3">
          <label htmlFor="pilotos" className="form-label">Pilotos</label>
          { pilotos && (<select multiple className="form-control" id="pilotos" size={pilotos ? pilotos.length : 0} {...register("pilotos")}>
            {pilotos && pilotos.map((opcion, index) => (
              <option key={opcion.id} value={opcion.id}>
                { opcion.nombre }
              </option>
            ))}
          </select>)}
        </div>
        <button type="submit" className="btn btn-primary" disabled={!isValid}>Guardar</button>
        <button type="reset" className="ms-1 btn btn-secondary" onClick={ onDescartar }>Descartar</button>
      </form>
    </div>
  );
}

export default Formulario;
