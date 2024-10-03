import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

const NavMenu = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/dashboard">Películas</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;
