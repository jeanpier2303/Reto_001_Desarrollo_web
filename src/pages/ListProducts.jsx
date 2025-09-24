import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function ListProducts(){
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try{
      const res = await api.get('/products');
      setProducts(res.data);
    }catch(err){
      console.error(err);
      alert('Error al obtener productos');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if(!confirm('Eliminar producto?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error al eliminar');
    }
  };

  return (
    <div className="card p-3">
      <h3>Productos</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="6">No hay productos</td></tr>
          ) : products.map(p => {
            // Disponible o nooo
            const isAvailable = p.stock > 0 && p.available;
            return (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{Number(p.price).toFixed(2)}</td>
                <td>{p.stock}</td>
                <td>
                  {isAvailable ? (
                    <span className="badge bg-success">Sí</span>
                  ) : (
                    <span className="badge bg-danger">No</span>
                  )}
                </td>
                <td>
                  <Link to={`/editar/${p.id}`} className="btn btn-sm btn-primary me-2">Editar</Link>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>Eliminar</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
