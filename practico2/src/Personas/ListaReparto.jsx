import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Container, Button, Row, Col, Card} from "react-bootstrap";
import NavMenu from "../components/navMenu";
import { Link } from "react-router-dom";

const ListaReparto = () => {
    const [listaReparto, setListaReparto] = useState([]);

    useEffect(() => {
        getListaReparto();
    }, []);

    const getListaReparto = () => {
        axios.get('http://localhost:3000/reparto')
            .then(res => {
                setListaReparto(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar la persona?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/reparto/${id}`)
            .then(res => {
                console.log(res.data);
                getListaReparto();
            })
            .catch(error => {
                console.log(error);
            });
    };

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
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaReparto.map(persona => (
                            <tr key={persona.id}>
                                <td>{persona.id}</td>
                                <td>{persona.nombre}</td>
                                <td>{persona.apellido}</td>
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

export default ListaReparto;
