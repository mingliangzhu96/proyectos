import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import styles from '../styles/global.module.css'; 

interface Invoice {
  nombreTienda: string;
  cif: string;
  ciudad: string;
  fecha: string;
  numero: string;
  cliente: {
    nombre: string;
    direccion: string;
    telefono: string;
    nif: string;
  };
  items: {
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    total: number;
  }[];
  subtotal: number;
  // Resto de propiedades de la factura...
}

const exportToPDF = () => {
  const invoiceElement = document.getElementById('invoice');

  if (invoiceElement) {
    html2canvas(invoiceElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');
    });
  }
};

const InvoicePage: NextPage = () => {
  const [invoice, setInvoice] = useState<Invoice>({
    nombreTienda: '',
    cif: '',
    ciudad: '',
    fecha: '',
    numero: '',
    cliente: {
      nombre: '',
      direccion: '',
      telefono: '',
      nif: '',
    },
    items: [
      {
        descripcion: '', // Producto por defecto
        cantidad: 0,
        precioUnitario: 0,
        total:0 ,
      }
    ],
    subtotal: 0,
    // Resto de propiedades de la factura con valores iniciales...
  });

  useEffect(() => {
    const calculateSubtotal = () => {
      const newSubtotal = invoice.items.reduce((acc, curr) => acc + curr.total, 0);
      setInvoice((prevState) => ({
        ...prevState,
        subtotal: newSubtotal,
      }));
    };
    calculateSubtotal();
  }, [invoice.items]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setInvoice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClientInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setInvoice((prevState) => ({
      ...prevState,
      cliente: {
        ...prevState.cliente,
        [name]: value,
      },
    }));
  };

  const handleItemChange = (index: number, field: string, value: string | number): void => {
    setInvoice((prevState) => {
      const items = [...prevState.items];
      const item = { ...items[index], [field]: value };
      const total = Number(item.cantidad) * Number(item.precioUnitario);
      const updatedItem = { ...item, total };
      items[index] = updatedItem;
      return {
        ...prevState,
        items,
      };
    });
  };

  
    const handleAddItem = (): void => {
      const newItem = {
        descripcion: '',
        cantidad: 0,
        precioUnitario: 0,
        total: 0,
      };
    
      setInvoice((prevState) => ({
        ...prevState,
        items: [...prevState.items, newItem],
      }));
    };
    
   

  return (
    <div>

        <div id="invoice" style={{ padding: '10px', background: '#fff' }} >
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Factura Simple</h1>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Nombre de la Tienda:
              <input
                type="text"
                name="nombreTienda"
                value={invoice.nombreTienda}
                onChange={handleInputChange}
                className={styles['input-futuristic']}
              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              CIF:
              <input
                type="text"
                name="cif"
                value={invoice.cif}
                onChange={handleInputChange}
                className={styles['input-futuristic']}
              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Ciudad:
              <input
                type="text"
                name="ciudad"
                value={invoice.ciudad}
                onChange={handleInputChange}
                className={styles['input-futuristic']}
                              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Fecha:
              <input
                type="text"
                name="fecha"
                value={invoice.fecha}
                onChange={handleInputChange}
                className={styles['input-futuristic']}
                              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Número de Factura:
              <input
                type="text"
                name="numero"
                value={invoice.numero}
                onChange={handleInputChange}
                className={styles['input-futuristic']}
                              />
            </label>
          </div>

          <h2>Cliente</h2>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Nombre:
              <input
                type="text"
                name="nombre"
                value={invoice.cliente.nombre}
                onChange={handleClientInputChange}
                className={styles['input-futuristic']}
                              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Dirección:
              <input
                type="text"
                name="direccion"
                value={invoice.cliente.direccion}
                onChange={handleClientInputChange}
                className={styles['input-futuristic']}
                              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Teléfono:
              <input
                type="text"
                name="telefono"
                value={invoice.cliente.telefono}
                onChange={handleClientInputChange}
                className={styles['input-futuristic']}
                              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              NIF/DNI/NIE:
              <input
                type="text"
                name="nif"
                value={invoice.cliente.nif}
                onChange={handleClientInputChange}
                className={styles['input-futuristic']}
                              />
            </label>
          </div>
          <h2>
              <button
                onClick={handleAddItem}
                style={{
                  fontWeight: 'bold',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#333',
                  outline: 'none',
                  fontSize: '20px',
                  padding: '10px',
                  cursor: 'pointer',
                }}
                title="Si tienes más productos que añadir, pulsa aquí"
              >
                +Productos+
              </button>
            </h2>
          {invoice.items.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginBottom: '10px' }}>
                <label>
                  Descripción:
                  <input
                    type="text"
                    value={item.descripcion}
                    onChange={(event) => handleItemChange(index, 'descripcion', event.target.value)}
                    className={styles['input-futuristic']}
                                      />
                </label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>
                  Cantidad:
                  <input
                    type="number"
                    value={item.cantidad}
                    onChange={(event) => handleItemChange(index, 'cantidad', event.target.value)}
                    className={styles['input-futuristic']}
                                      />
                </label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>
                  Precio Unitario:
                  <input
                    type="number"
                    value={item.precioUnitario}
                    onChange={(event) => handleItemChange(index, 'precioUnitario', event.target.value)}
                    className={styles['input-futuristic']}
                                      />
                </label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>
                  Total:
                  <input className={styles['input-futuristic']} type="number" value={item.total} readOnly />
                </label>
              </div>
            </div>
          ))}

          

          <div>
            <label>
              Subtotal:
              <input
                className={styles['input-futuristic']}
                type="number"
                name="subtotal"
                value={invoice.subtotal}
                readOnly
              />
            </label>
          </div>

          <div>
            <label>
              IVA incluido:
              <input className={styles['input-futuristic']}type="text" value="SI" readOnly />
            </label>
          </div>

          <div>
            <label>
              Total:
              <input
                className={styles['input-futuristic']}
                type="number"
                value={invoice.subtotal}
                readOnly
              />
            </label>
          </div>

          <p style={{ marginTop: '10px' }}>Gracias por tu visita</p>
        
        </div>
        <button onClick={exportToPDF} style={{
           backgroundColor: 'green',
           color: 'white',
           padding: '10px 10px',
           border: 'none',
           borderRadius: '5px',
           cursor: 'pointer',
           fontWeight: 'bold',
           fontSize: '16px',
           marginBottom: '10px',
           alignContent:'center',
         }}>Exportar a PDF</button>
    </div>
    
  );
};

export default InvoicePage;
