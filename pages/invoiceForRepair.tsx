import React from 'react';
import Link from 'next/link';


const InvoiceTemplate = () => {
  return (
    <div className="container">
      <h1>Aplicación de Facturación</h1>
      <div className="factura">
        <h2>Factura</h2>
        <div className="cliente">
          <p><strong>Cliente:</strong> Juan Pérez</p>
          <p><strong>Dirección:</strong> Calle Principal, Ciudad</p>
        </div>
        <div className="detalles">
          <table>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Producto 1</td>
                <td>2</td>
                <td>$10</td>
                <td>$20</td>
              </tr>
              <tr>
                <td>Producto 2</td>
                <td>1</td>
                <td>$15</td>
                <td>$15</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="total">
          <p><strong>Total:</strong> $35</p>
        </div>
      </div>

      <style jsx>{`
        /* Estilos generales */
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        h1 {
          text-align: center;
          margin-top: 0;
        }

        /* Estilos para la factura */
        .factura {
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #fff;
          padding: 20px;
          margin-bottom: 20px;
        }

        .factura h2 {
          margin-top: 0;
          text-align: center;
        }

        .factura .cliente {
          margin-bottom: 20px;
        }

        .factura .cliente p {
          margin: 0;
        }

        .factura .detalles {
          margin-bottom: 20px;
        }

        .factura .detalles table {
          width: 100%;
          border-collapse: collapse;
        }

        .factura .detalles th,
        .factura .detalles td {
          padding: 8px;
          border-bottom: 1px solid #ccc;
        }

        .factura .total {
          text-align: right;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default InvoiceTemplate;
