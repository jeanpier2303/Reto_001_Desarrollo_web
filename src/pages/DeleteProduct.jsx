import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function DeleteProduct(){
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!id) return alert('Ingresa ID');
    try{
      await api.delete(`/products/${id}`);
      alert('Producto eliminado');
      navigate('/listar');
    }catch(err){
      console.error(err);
      alert('Error al eliminar (revisa que el ID exista)');
    }
  };

  return (
    <div className="card p-3">
      <h3>Eliminar Producto</h3>
      <Form onSubmit={handleDelete} className="d-flex gap-2">
        <Form.Control placeholder="ID del producto" value={id} onChange={e=>setId(e.target.value)} />
        <Button type="submit" variant="danger">Eliminar</Button>
      </Form>
    </div>
  );
}
