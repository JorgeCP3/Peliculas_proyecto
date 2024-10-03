import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom"; // Asegúrate de importar useNavigate
import moment from "moment";
import NavMenu from "../../components/NavMenu";

const ListaPeliculas = () => {
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

    const eliminar = (id) => {
        const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta película?");
        if (!confirmar) {
            return;
        }
        axios.delete(`http://localhost:3000/peliculas/${id}`)
        .then(res => {
            console.log(res);
            getListaPeliculas();
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
                                                        src={`http://localhost:3000/images/peliculas/${pelicula.id}.jpg`} 
                                                        alt="Imagen de la película" 
                                                        width="100" 
                                                    />
                                                </td>
                                                <td>{pelicula.id}</td>
                                                <td>{pelicula.titulo}</td>
                                                <td>{pelicula.sinopsis}</td>
                                                <td>{moment(pelicula.fechaLanzamiento).format('DD/MM/YYYY')}</td>
                                                <td>{pelicula.rotten_tomatoes + '%'}</td>
                                                <td>
                                                    <Link className="btn btn-warning me-2" to={`/admin/peliculas/${pelicula.id}/reparto`}>
                                                        Añadir Reparto
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link className="btn btn-success" to={`/admin/peliculas/${pelicula.id}/foto`}>Cambiar Foto</Link>
                                                </td>
                                                <td>
                                                    <Link className="btn btn-primary me-2" to={pelicula.trailer_url}>
                                                        Ver Trailer
                                                    </Link>
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
