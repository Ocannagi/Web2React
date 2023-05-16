import React from 'react';
import Producto from './producto';


class Carrito extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        productos: [
          {nombre: 'Lavandina 2L', precio: 125.50, cantidad: 2, oferta: true},
          {nombre: 'Tomate perita lata 300g', precio: 230.0, cantidad: 4, oferta: false},
          {nombre: 'Aceite Girasol 900ml', precio: 190.50, cantidad: 1, oferta: true},
        ],
        ordenadoNombreAsc: false,
        ordenadoPrecioAsc: false,
        ordenadoCantidadAsc: false, 
      };
    }
  
    ordenarPorNombre() {
      let misProductos = this.state.productos;
      let miOrden = this.state.ordenadoNombreAsc;
      miOrden = !miOrden;
      let OrdenPrecio= this.state.ordenadoPrecioAsc;
      let OrdenCantidad = this.state.ordenadoCantidadAsc;
      misProductos.sort((a, b) => a.nombre < b.nombre ? (miOrden ? -1 : 1) : (a.nombre > b.nombre ? (miOrden ? 1 : -1) : 0) ); // -1 a / 1 b / 0 iguales
      this.setState({
        productos: misProductos,
        ordenadoNombreAsc: miOrden,
        ordenadoPrecioAsc: OrdenPrecio,
        ordenadoCantidadAsc: OrdenCantidad
      });
    }

    ordenarPorPrecio(){
      let misProductos = this.state.productos;
      let miOrden = this.state.ordenadoPrecioAsc;
      miOrden = !miOrden;
      let OrdenNombre = this.state.ordenadoNombreAsc
      let OrdenCantidad = this.state.ordenadoCantidadAsc;
      misProductos.sort((a, b) => a.precio < b.precio ? (miOrden ? -1 : 1) : (a.precio > b.precio ? (miOrden ? 1 : -1) : 0) ); // -1 a / 1 b / 0 iguales
      this.setState({
        productos: misProductos,
        ordenadoNombreAsc: OrdenNombre,
        ordenadoPrecioAsc: miOrden,
        ordenadoCantidadAsc: OrdenCantidad
      });
    }

    ordenarPorCantidad(){
        let misProductos = this.state.productos;
        let miOrden = this.state.ordenadoCantidadAsc;
        miOrden = !miOrden;
        let OrdenNombre = this.state.ordenadoNombreAsc
        let OrdenPrecio= this.state.ordenadoPrecioAsc;
        misProductos.sort((a, b) => a.cantidad < b.cantidad ? (miOrden ? -1 : 1) : (a.cantidad > b.cantidad ? (miOrden ? 1 : -1) : 0) ); // -1 a / 1 b / 0 iguales
        this.setState({
          productos: misProductos,
          ordenadoNombreAsc: OrdenNombre,
          ordenadoPrecioAsc: OrdenPrecio,
          ordenadoCantidadAsc: miOrden
        });
      }
  
    render() {
  
      return (
        <div>
          <h3>Su compra: </h3>
          <div style={{width:'800px', display: 'table-row', fontFamily: 'courier', fontWeight: 'bold' }} >
            <div style={{ display: 'table-cell', borderBottom: '1px solid black', paddingRight: '20px' }} onClick={ () => this.ordenarPorNombre() } >
              Producto
            </div>
            <div style={{ display: 'table-cell', borderBottom: '1px solid black', paddingRight: '20px', textAlign: 'center' }} onClick ={()=> this.ordenarPorPrecio()}>
              Precio U.
            </div>
            <div style={{ display: 'table-cell', borderBottom: '1px solid black', paddingRight: '20px', textAlign: 'center' }} onClick = {() => this.ordenarPorCantidad()}>
              Cantidad
            </div>
            <div style={{ display: 'table-cell', borderBottom: '1px solid black', paddingRight: '20px', textAlign: 'center' }}>
              Total
            </div>
          </div>
          {
            this.state.productos.map( (producto, index) => 
              ( <Producto key={index} unproducto={ producto } /> )
            )
          }
        </div>
      );
    }
  }
  

export default Carrito;
