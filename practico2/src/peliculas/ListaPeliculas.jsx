import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Asegúrate de importar useNavigate
import moment from "moment";
import NavMenu from "../components/NavMenu";

const ListaPeliculas = () => {
    const navigate = useNavigate();
    const [listaPeliculas, setListaPeliculas] = useState([]);

    useEffect(() => {
        getListaPeliculas();
        document.title = "Lista de Películas";
    }, []);

    const getListaPeliculas = () => {
        axios.get('http://localhost:3000/peliculas')
            .then(res => {
                setListaPeliculas(res.data);
            })
            .catch(error => {
                console.log("Error al obtener la lista de películas:", error);
            });
    };

    const añadirReparto = (id) => {
        navigate(`/admin/peliculas/${id}/reparto`);
    };

    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar la película?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/peliculas/${id}`)
            .then(res => {
                console.log(res.data);
                getListaPeliculas();
            })
            .catch(error => {
                console.log("Error al eliminar la película:", error);
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
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Sinopsis</th>
                                            <th>Fecha de Lanzamiento</th>
                                            <th>Calificación</th>
                                            <th>Trailer</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listaPeliculas.map(pelicula => (
                                            <tr key={pelicula.id}>
                                                <td>
                                                    <img 
                                                        src={`http://localhost:3000/peliculas/${pelicula.id}.jpg`} 
                                                        alt="Imagen de la película" 
                                                        width="100" 
                                                    />
                                                </td>
                                                <td>{pelicula.id}</td>
                                                <td>{pelicula.nombre}</td>
                                                <td>{pelicula.sinopsis}</td>
                                                <td>{moment(pelicula.fechaLanzamiento).format('DD/MM/YYYY')}</td>
                                                <td>{pelicula.calificacion_rotten_tomatoes + '%'}</td>
                                                <td>
                                                    <Link className="btn btn-success" to={`/admin/peliculas/${pelicula.id}/foto`}>Cambiar Foto</Link>
                                                </td>
                                                <td>
                                                    <Link className="btn btn-primary me-2" to={pelicula.trailer_url}>
                                                        Ver Trailer
                                                    </Link>
                                                </td>
                                                <td>
                                                <Button variant="warning" onClick={() => añadirReparto(pelicula.id)}>
                                                        Reparto
                                                    </Button>
                                                </td>
                                                <td>
                                                <Link className="btn btn-primary me-2" to={`/admin/peliculas/${pelicula.id}`}>
                                                        Editar
                                                    </Link>
                                                </td>
                                                <td>
                                                <Button variant="danger" onClick={() => eliminar(pelicula.id)}>
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

export default ListaPeliculas;
