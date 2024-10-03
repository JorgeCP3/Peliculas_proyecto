import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Card, ListGroup, Nav, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavMenu from '../../components/NavMenu';

const PersonaDetalles = () => {
    const { id } = useParams();

    const [nombre, setNombre] = useState('');
    const [peliculasDirigidas, setPeliculasDirigidas] = useState([]);
    const [peliculasActuadas, setPeliculasActuadas] = useState([]);

    useEffect(() => {
        if (!id) return;
        getPersonaById();
    }, [id]);

    const getPersonaById = () => {
        axios.get(`http://localhost:3000/personas/${id}`)
            .then(res => {
                const persona = res.data;
                setNombre(persona.nombre_completo);
                
                // Separar las películas en función de su rol
                const dirigidas = persona.peliculas.filter(p => p.rol === "Director");
                const actuadas = persona.peliculas.filter(p => p.rol === "Actor");

                setPeliculasDirigidas(dirigidas);
                setPeliculasActuadas(actuadas);
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <NavMenu />
            <Container className="mt-3">
                <Row>
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{nombre}</Card.Title>
                                <Image src={`http://localhost:3000/images/personas/${id}.jpg`} rounded fluid />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Películas como Director</Card.Title>
                                <ListGroup variant="flush">
                                    {peliculasDirigidas.length > 0 ? (
                                        peliculasDirigidas.map(pelicula => (
                                            <ListGroup.Item key={pelicula.id}>
                                                <Nav.Link href={`/peliculas/${pelicula.id}`}>
                                                    <Row>
                                                        <Col md={4}>
                                                            <Image src={`http://localhost:3000/peliculas/${pelicula.id}.jpg`} rounded fluid />
                                                        </Col>
                                                        <Col md={8}>
                                                            {pelicula.titulo}
                                                        </Col>
                                                    </Row>
                                                </Nav.Link>
                                            </ListGroup.Item>
                                        ))
                                    ) : (
                                        <ListGroup.Item>No ha dirigido películas</ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Películas como Actor</Card.Title>
                                <ListGroup variant="flush">
                                    {peliculasActuadas.length > 0 ? (
                                        peliculasActuadas.map(pelicula => (
                                            <ListGroup.Item key={pelicula.id}>
                                                <Nav.Link href={`/peliculas/${pelicula.id}`}>
                                                    <Row>
                                                        <Col md={4}>
                                                            <Image src={`http://localhost:3000/peliculas/${pelicula.id}.jpg`} rounded fluid />
                                                        </Col>
                                                        <Col md={8}>
                                                            {pelicula.titulo}
                                                        </Col>
                                                    </Row>
                                                </Nav.Link>
                                            </ListGroup.Item>
                                        ))
                                    ) : (
                                        <ListGroup.Item>No ha actuado en películas</ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default PersonaDetalles;
