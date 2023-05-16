import React from 'react';

class Producto extends React.Component {
    render() {
      return (
        <div style={{width:'800px', display: 'table-row', fontFamily: 'courier'}}>
          <div style={{ display: 'table-cell', borderBottom: '1px solid black', paddingRight: '20px' }}>
            { this.props.unproducto.nombre }
          </div>
          <div style={{ display: 'table-cell', borderBottom: '1px solid black', paddingRight: '20px', textAlign: 'right' }}>
            ${ this.props.unproducto.precio.toFixed(2) }
          </div>
          <div style={{ display: 'table-cell', borderBottom: '1px solid black', paddingRight: '20px', textAlign: 'center' }}>
            { this.props.unproducto.cantidad }
          </div>
          <div style={{ display: 'table-cell', borderBottom: '1px solid black', paddingRight: '20px', textAlign: 'right' }}>
            ${ (this.props.unproducto.precio * this.props.unproducto.cantidad).toFixed(2) }
          </div>
          <div style={{ display: 'table-cell', paddingRight: '20px', textAlign: 'center' }}>
            { ( this.props.unproducto.oferta && '¡OFERTA!' ) }
          </div>
        </div>
      );
    }
  }

  export default Producto