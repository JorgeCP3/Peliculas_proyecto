import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import NavMenuUser from '../../components/NavMenuUser';
//import css/style.css
import '../../../public/css/style.css';

const Dashboard = () => {
    
    const [listaPeliculas, setListaPeliculas] = useState([]);
    useEffect(() => {
        getListaPeliculas();
        document.title = "Lista de Películas";
    }, []);	

    const getListaPeliculas = async () => {
        axios.get("http://localhost:3000/peliculas")
        .then(res => {
            setListaPeliculas(res.data);
            console.log(res);
        }).catch(err => {
            console.error(err);
        });
    }

    

    return (
        <>
        <NavMenuUser />
        <Container className="mt-4">
        <Row>
                    <Col>
                            <Card.Body>
                                <Card.Title>
            </Card.Title>
            <Row>
                {listaPeliculas.map((pelicula) => (
                    <Col key={pelicula.id} md={4} className="mb-4">
                        <Card>
                            <Card.Img
                                src={`http://localhost:3000/images/peliculas/${pelicula.id}.jpg`} 
                                alt="Imagen de la película" 
                                width="100" 
                                height="500"
                            />
                            <Card.Body>
                                <Card.Title>{pelicula.titulo}</Card.Title>
                                <Card.Text>
                                    {pelicula.sinopsis}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Rotten Tomatoes:</strong> {pelicula.rotten_tomatoes}%
                                </Card.Text>
                            </Card.Body>
                            <Link to={`/peliculas/${pelicula.id}`} className="btn btn-primary">
                                    Ver detalles
                                </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
            </Card.Body>
                    </Col>
                </Row>
        </Container>
        </>
    );
};

export default Dashboard;
