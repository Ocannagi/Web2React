import React from 'react';
import Listado from './Listado'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventoSeleccionado: {},
    };
  }

  render() {
    return (
      <main className="container">
        <h1>Sistema de eventos</h1>
        <hr />
        <Listado />
      </main>
    );
  }
}

export default App;
