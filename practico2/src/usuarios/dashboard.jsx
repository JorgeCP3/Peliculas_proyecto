import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import NavMenuUser from '../components/NavMenuUser';
//import css/style.css
import '../../public/css/style.css';

const Dashboard = () => {
    const [peliculas, setPeliculas] = useState([]);

    const fetchPeliculas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/peliculas');
            setPeliculas(response.data);
        } catch (error) {
            console.error('Error al obtener las películas:', error);
        }
    };

    useEffect(() => {
        fetchPeliculas(); 
    }, []);

    return (
        <>
        <NavMenuUser />
        <Container className="mt-4">
        <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
            <h1 className="text-center mb-4">Películas Ordenadas por Calificación</h1>
            </Card.Title>
            <Row>
                {peliculas.map((pelicula) => (
                    <Col key={pelicula.id} md={4} className="mb-4">
                        <Card>
                            <Card.Img
                                variant="top"
                                src={`/images/peliculas/${pelicula.id}.jpg`}
                                alt={pelicula.nombre}
                            />
                            <Card.Body>
                                <Card.Title>{pelicula.nombre}</Card.Title>
                                <Card.Text>
                                    {pelicula.sinopsis}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Calificación Rotten Tomatoes:</strong> {pelicula.calificacion_rotten_tomatoes}%
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            </Card.Body>
                        </Card>
                    </Col>
                </Row>
        </Container>
        </>
    );
};

export default Dashboard;
