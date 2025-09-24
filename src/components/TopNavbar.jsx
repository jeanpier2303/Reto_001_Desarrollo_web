import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export default function TopNavbar({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#d3dae1ff",
          color: "white",
          padding: "20px",
        }}
      >
        
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/agregar" className="text-black">Agregar</Nav.Link>
          <Nav.Link as={Link} to="/editar" className="text-black">Modificar</Nav.Link>
          <Nav.Link as={Link} to="/eliminar" className="text-black">Eliminar</Nav.Link>
          <Nav.Link as={Link} to="/listar" className="text-black">Listar</Nav.Link>
        </Nav>
      </div>

      <div style={{ flex: 1, padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}
