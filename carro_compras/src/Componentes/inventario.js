import React from 'react';

class Inventario extends React.Component {
    render() {
      return (
        <div style={{width:'800px', display: 'table-row', fontFamily: 'courier'}}>
          <div style={{ display: 'table-cell', borderBottom: '1px solid black', paddingRight: '20px' }}>
            { this.props.uninventario.nombre }
          </div>
          <div style={{ display: 'table-cell', borderBottom: '1px solid black', paddingRight: '20px', textAlign: 'right' }}>
            ${ this.props.uninventario.precio.toFixed(2) }
          </div>
          <div style={{ display: 'table-cell', borderBottom: '1px solid black', paddingRight: '20px', textAlign: 'center' }}>
            { this.props.uninventario.stock }
          </div>
          
        </div>
      );
    }
  }

  export default Inventario