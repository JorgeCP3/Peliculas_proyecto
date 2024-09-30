import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavMenu = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Películas" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to="/admin/peliculas">Lista de Películas</Link>
                            <Link className="dropdown-item" to="/admin/peliculas/create">Crear Película</Link>
                        </NavDropdown>
                        <NavDropdown title="Personas" id="basic-nav-dropdown-reparto">
                            <Link className="dropdown-item" to="/admin/personas">Lista de Personas</Link>
                            <Link className="dropdown-item" to="/admin/personas/create">Crear Persona</Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;
