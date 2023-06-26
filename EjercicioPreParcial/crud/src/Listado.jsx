import axios from 'axios';
import React from 'react';
import Formulario from './Formulario'

class Listado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventos: null,
      eventoSeleccionado: null,
    };
  }

  componentDidMount () {
    this.listarEventos();
  }

  listarEventos = () => {
    axios.get('http://localhost:3001/eventos')
      .then((response) => {
        response.data.forEach(function (x) { x.fecha = new Date(x.fecha)});
        this.setState((prevState) => {
          return {
            ...prevState,
            eventos: response.data,
          }
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({eventos: []});
      });
  }

  botonEditar (unEvento) {
    this.setState((prevState) => {
      return {
        ...prevState,
        eventoSeleccionado: unEvento,
      }
    });
  }

  botonBorrar (unEvento) {
    axios.delete(`http://localhost:3001/eventos/${unEvento.id}`)
      .then((response) => {
        this.listarEventos();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  formularioDescartado = () => {
    console.log('formularioDescartado');
    this.setState((prevState) => {
      return {
        ...prevState,
        eventoSeleccionado: null,
      }
    });
  }

  render() {
    return (
      <>
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
              { this.state.eventos && this.state.eventos.map( (evento, index) => (
                  <tr key={index}>
                    <td className="text-center">{ evento.nombre }</td>
                    <td className="text-center">{ evento.lugar }</td>
                    <td className="text-center">
                      { evento.fecha.toLocaleDateString() } - 
                      { evento.fecha.toLocaleTimeString().substr(0, 5) }hs.
                    </td>
                    <td className="text-center">{ evento.organizador }</td>
                    <td className="text-center">{ evento.contacto }</td>
                    <td className="text-center text-nowrap">
                      <button type="button" className="btn btn-sm btn-primary" onClick={ () => this.botonEditar(evento) }>Editar</button>
                      <button type="button" className="ms-1 btn btn-sm btn-danger" onClick={() => this.botonBorrar(evento) }>Borrar</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <button type="button" className="ms-2 btn btn-sm btn-secondary">Agregar evento</button>
        </div>
        <hr />
        <Formulario eventoSeleccionado={this.state.eventoSeleccionado} onDescartar={ this.formularioDescartado } onCambio={ this.listarEventos } />
      </>
    );
  }
}

export default Listado;
