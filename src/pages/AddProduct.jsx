import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AddProduct(){
  const [name,setName] = useState('');
  const [price,setPrice] = useState('');
  const [stock,setStock] = useState('');
  const [available,setAvailable] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 👇 regla automática
    const finalAvailable = parseInt(stock) === 0 ? false : available;

    try{
      await api.post('/products', { 
        name, 
        price: parseFloat(price), 
        stock: parseInt(stock), 
        available: finalAvailable
      });
      alert('Producto creado correctamente');
      navigate('/listar');
    }catch(err){
      console.error(err);
      alert('Error al crear producto');
    }
  };

  return (
    <div className="card p-3">
      <h3>Agregar Producto</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Nombre</Form.Label>
          <Form.Control value={name} onChange={e=>setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" step="0.01" value={price} onChange={e=>setPrice(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Stock</Form.Label>
          <Form.Control 
            type="number" 
            value={stock} 
            onChange={e=>{
              const val = e.target.value;
              setStock(val);
              if (parseInt(val) === 0) setAvailable(false); // regla automática
            }} 
            required 
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Check
            type="checkbox"
            label="Disponible"
            checked={available}
            onChange={e => setAvailable(e.target.checked)}
            disabled={parseInt(stock) === 0} //  si stock es 0
          />
        </Form.Group>
        <Button type="submit">Guardar</Button>
      </Form>
    </div>
  );
}
