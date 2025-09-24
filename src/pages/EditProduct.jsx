import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import api from '../services/api';

export default function EditProduct(){
  const { id: paramId } = useParams();
  const [id, setId] = useState(paramId || '');
  const [product, setProduct] = useState(null);
  const [name,setName] = useState('');
  const [price,setPrice] = useState('');
  const [stock,setStock] = useState('');
  const [available,setAvailable] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (paramId) {
      setId(paramId);
      fetchProduct(paramId);
    }
  }, [paramId]);

  const fetchProduct = async (searchId) => {
    try{
      const res = await api.get(`/products/${searchId}`);
      setProduct(res.data);
      setName(res.data.name);
      setPrice(res.data.price);
      setStock(res.data.stock);
      setAvailable(res.data.available);
    }catch(err){
      console.error(err);
      alert('Producto no encontrado');
      setProduct(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!id) return alert('Ingresa un ID');
    fetchProduct(id);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!product) return alert('Busca un producto antes de guardar');

    const finalAvailable = parseInt(stock) === 0 ? false : available;

    try{
      await api.put(`/products/${product.id}`, { 
        name, 
        price: parseFloat(price), 
        stock: parseInt(stock),
        available: finalAvailable
      });
      alert('Producto actualizado');
      navigate('/listar');
    }catch(err){
      console.error(err);
      alert('Error al actualizar');
    }
  };

  return (
    <div className="card p-3">
      <h3>Modificar Producto</h3>

      <Form onSubmit={handleSearch} className="mb-3 d-flex gap-2">
        <Form.Control 
          placeholder="ID del producto" 
          value={id} 
          onChange={e=>setId(e.target.value)} 
        />
        <Button type="submit">Buscar</Button>
      </Form>

      {product ? (
        <Form onSubmit={handleSave}>
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
                if (parseInt(val) === 0) setAvailable(false); // 
              }} 
              required 
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Check 
              type="checkbox" 
              label="Disponible" 
              checked={available} 
              onChange={e=>setAvailable(e.target.checked)} 
              disabled={parseInt(stock) === 0} //  desactivar if stock es 0
            />
          </Form.Group>
          <Button type="submit">Guardar</Button>
        </Form>
      ) : (
        <p>Busca un producto por ID para editarlo.</p>
      )}
    </div>
  );
}
