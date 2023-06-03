import React from 'react';

const PlantillaFactura: React.FC = () => {
  return (
    <div className="factura">
      <h2>Factura</h2>
      <div>
        <strong>Número de Factura:</strong> 001
      </div>
      <div>
        <strong>Fecha:</strong> 12 de mayo de 2023
      </div>
      <div>
        <h3>Tienda</h3>
        <p>Nombre de la tienda</p>
        <p>Dirección de la tienda</p>
        <p>Identificación Fiscal: XXXXXXXX</p>
      </div>
      <div>
        <h3>Cliente</h3>
        <p>Nombre del cliente</p>
        <p>Dirección del cliente</p>
        <p>Identificación Fiscal: XXXXXXXX</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Producto 1</td>
            <td>2</td>
            <td>$10.00</td>
            <td>$20.00</td>
          </tr>
          <tr>
            <td>Producto 2</td>
            <td>1</td>
            <td>$15.00</td>
            <td>$15.00</td>
          </tr>
        </tbody>
      </table>
      <div>
        <strong>Monto Total:</strong> $35.00
      </div>
      <div>
        <strong>Fecha de Vencimiento:</strong> 30 de mayo de 2023
      </div>
    </div>
  );
};

export default PlantillaFactura;
