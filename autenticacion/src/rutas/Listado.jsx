import axios from 'axios';
import React from 'react';
import Example from '../partes/Example';

class Listado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: null,
    };
  }

  componentDidMount () {
    this.listar();
  }

  listar() {
    axios.get('usuarios')
      .then((response) => {
        this.setState({usuarios: response.data});
      })
      .catch((response) => {
        this.setState({usuarios: []});
      });
  }

  botonEditar (unUsuario) {
    Example.handleShow();
  };

  botonBorrar (unUsuario) {
    if (window.confirm(`¿Estás seguro de que querés eliminar a ${unUsuario.nombre}?`)) {
      axios.delete('usuarios/' + unUsuario.id)
        .then((response) => {
          this.listar();
        })
        .catch((response) => {
          window.alert('Algo falló en la eliminación');
        });
    }
    
  };

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="text-center">Foto</th>
              <th scope="col" className="text-center">Nombre</th>
              <th scope="col" className="text-center">Email</th>
              <th scope="col" className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            { this.state.usuarios && this.state.usuarios.map( (usuario, index) => (
                <tr key={index}>
                  <td className="text-center"><img src={ usuario.foto } style={{'width':'30px'}} /></td>
                  <td className="text-center">{ usuario.nombre }</td>
                  <td className="text-center">{ usuario.email }</td>
                  <td className="text-center text-nowrap">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => this.botonEditar(usuario)}>Editar</button>
                    <button type="button" className="ms-1 btn btn-sm btn-danger" onClick={() => this.botonBorrar(usuario)}>Borrar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <button type="button" className="ms-2 btn btn-sm btn-secondary">Agregar usuario</button>
      </div>
    );
  }
}

export default Listado;
