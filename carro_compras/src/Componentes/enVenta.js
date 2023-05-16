import React from 'react';
import Inventario from './inventario';


class EnVenta extends React.Component {
    constructor (props) {
      super(props);
      this.state = {
        productos: [
          {nombre: 'Lavandina 2L', precio: 125.50, stock: 200},
          {nombre: 'Tomate perita lata 300g', precio: 230.0, stock: 400},
          {nombre: 'Aceite Girasol 900ml', precio: 190.50, stock: 100},
          { nombre: 'Chocolate', precio: 200.00, stock: 100 },
          { nombre: 'Galletas', precio: 100.50, stock: 800 },
          { nombre: 'Leche', precio: 200.50, stock: 500 },
          { nombre: 'Pan', precio: 100.20, stock: 150 },
          { nombre: 'Manzanas', precio: 300.80, stock: 200 },
          { nombre: 'Cereales', precio: 300.50, stock: 300 },
          { nombre: 'Papas', precio: 100.00, stock: 700 },
          { nombre: 'Cerveza', precio: 100.50, stock: 120 },
          { nombre: 'Queso', precio: 300.20, stock: 400 },
          { nombre: 'Jamón', precio: 400.00, stock: 600 },
        ],
        ordenadoNombreAsc: false,
        ordenadoPrecioAsc: false,
        ordenadoStockAsc: false, 
      };
    }
  
    ordenarPorNombre() {
      let misProductos = this.state.productos;
      let miOrden = this.state.ordenadoNombreAsc;
      miOrden = !miOrden;
      let OrdenPrecio= this.state.ordenadoPrecioAsc;
      let OrdenStock = this.state.ordenadoStockAsc;
      misProductos.sort((a, b) => a.nombre < b.nombre ? (miOrden ? -1 : 1) : (a.nombre > b.nombre ? (miOrden ? 1 : -1) : 0) ); // -1 a / 1 b / 0 iguales
      this.setState({
        productos: misProductos,
        ordenadoNombreAsc: miOrden,
        ordenadoPrecioAsc: OrdenPrecio,
        ordenadoStockAsc: OrdenStock
      });
    }

    ordenarPorPrecio(){
      let misProductos = this.state.productos;
      let miOrden = this.state.ordenadoPrecioAsc;
      miOrden = !miOrden;
      let OrdenNombre = this.state.ordenadoNombreAsc
      let OrdenStock = this.state.ordenadoStockAsc;
      misProductos.sort((a, b) => a.precio < b.precio ? (miOrden ? -1 : 1) : (a.precio > b.precio ? (miOrden ? 1 : -1) : 0) ); // -1 a / 1 b / 0 iguales
      this.setState({
        productos: misProductos,
        ordenadoNombreAsc: OrdenNombre,
        ordenadoPrecioAsc: miOrden,
        ordenadoStockAsc: OrdenStock
      });
    }

    ordenarPorStock(){
        let misProductos = this.state.productos;
        let miOrden = this.state.ordenadoStockAsc;
        miOrden = !miOrden;
        let OrdenNombre = this.state.ordenadoNombreAsc
        let OrdenPrecio= this.state.ordenadoPrecioAsc;
        misProductos.sort((a, b) => a.stock < b.stock ? (miOrden ? -1 : 1) : (a.stock > b.stock ? (miOrden ? 1 : -1) : 0) ); // -1 a / 1 b / 0 iguales
        this.setState({
          productos: misProductos,
          ordenadoNombreAsc: OrdenNombre,
          ordenadoPrecioAsc: OrdenPrecio,
          ordenadoStockAsc: miOrden
        });
      }
  
    render() {
  
      return (
        <div>
          <h3>En Venta: </h3>
          <div style={{width:'800px', display: 'table-row', fontFamily: 'courier', fontWeight: 'bold' }} >
            <div style={{ display: 'table-cell', borderBottom: '1px solid black', paddingRight: '20px' }} onClick={ () => this.ordenarPorNombre() } >
              Producto
            </div>
            <div style={{ display: 'table-cell', borderBottom: '1px solid black', paddingRight: '20px', textAlign: 'center' }} onClick ={()=> this.ordenarPorPrecio()}>
              Precio U.
            </div>
            <div style={{ display: 'table-cell', borderBottom: '1px solid black', paddingRight: '20px', textAlign: 'center' }} onClick = {() => this.ordenarPorStock()}>
              Stock
            </div>
            
          </div>
          {
            this.state.productos.map( (producto, index) => 
              ( <Inventario key={index} uninventario={ producto } /> )
            )
          }
        </div>
      );
    }
  }
  

export default EnVenta;