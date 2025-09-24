import { Routes, Route, Navigate } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import DeleteProduct from './pages/DeleteProduct';
import ListProducts from './pages/ListProducts';
import './App.css'; 

function App() {
  return (
    <div className="app-root">
      {/* */}
      <header className="app-header">
        <h3>Dashboard Productos</h3>
      </header>

      {/* L */}
      <div className="app-layout">
        <TopNavbar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/listar" replace />} />
            <Route path="/agregar" element={<AddProduct />} />
            <Route path="/editar/:id" element={<EditProduct />} />
            <Route path="/editar" element={<EditProduct />} />
            <Route path="/eliminar" element={<DeleteProduct />} />
            <Route path="/listar" element={<ListProducts />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
