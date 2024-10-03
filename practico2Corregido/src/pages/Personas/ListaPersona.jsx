import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Container, Button, Row, Col, Card} from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";

const ListaPersona = () => {
    const [listaPersona, setListaPersona] = useState([]);
    useEffect(() => {
        getListaPersona();
        document.title = "Lista de Personas";
    }, []);

    const getListaPersona = async () => {
        axios.get("http://localhost:3000/personas")
            .then(res => {
                setListaPersona(res.data);
                console.log(res);
            }).catch(err => {
                console.error(err);
            });
    };

    const eliminar = (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta persona?");
        if (!confirmar) {
            return;
        }
        axios.delete(`http://localhost:3000/personas/${id}`)
            .then(res => {
                console.log(res);
                getListaPersona();
            }).catch(err => {
                console.error(err);
            });
    }

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
            <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Películas</h2>
                                </Card.Title>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Detalle de la Persona</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaPersona.map(persona => (
                                            <tr key={persona.id}>
                                                <td>
                                                    <img 
                                                        src={`http://localhost:3000/images/personas/${persona.id}.jpg`} 
                                                        alt="Imagen de la película" 
                                                        width="100" 
                                                    />
                                                </td>
                                                <td>{persona.id}</td>
                                                <td>{persona.nombre_completo}</td>
                                                <td>
                                                    <Link to={`/personas/${persona.id}`}>
                                                        <Button variant="info">Detalle</Button>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link className="btn btn-success" to={`/admin/personas/${persona.id}/foto`}>Cambiar Foto</Link>
                                                </td>
                                                <td>
                                                <Link className="btn btn-primary me-2" to={`/admin/personas/${persona.id}`}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                <Button variant="danger" onClick={() => eliminar(persona.id)}>
                                                        Eliminar
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ListaPersona;
