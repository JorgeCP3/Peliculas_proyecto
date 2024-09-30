import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../components/navMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const FormPelicula = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [sinopsis, setSinopsis] = useState('');
    const [fechaLanzamiento, setFechaLanzamiento] = useState('');
    const [calificacion, setCalificacion] = useState('');
    const [trailer, setTrailer] = useState('');
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getPeliculaById();
    }, [id]);

    const getPeliculaById = () => {
        axios.get(`http://localhost:3000/peliculas/${id}`)
            .then(res => {
                const pelicula = res.data;
                setNombre(pelicula.nombre);
                setSinopsis(pelicula.sinopsis);
                setFechaLanzamiento(moment(pelicula.fecha_lanzamiento).format('YYYY-MM-DD'));
                setCalificacion(pelicula.calificacion_rotten_tomatoes);
                setTrailer(pelicula.trailer_url);
            }).catch(error => {
                console.log(error);
            });
    };

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }
        const pelicula = {
            nombre,
            sinopsis,
            fecha_lanzamiento: fechaLanzamiento,
            calificacion_rotten_tomatoes: calificacion,
            trailer_url: trailer,
        }; 
    
        if (id) {
            editPelicula(pelicula);
        } else {
            insertPelicula(pelicula);
        }
    };

    const editPelicula = (pelicula) => {
        axios.put(`http://localhost:3000/peliculas/${id}`, pelicula)
            .then(res => {
                console.log(res.data);
                navigate('/admin/peliculas');
            }).catch(error => {
                console.log(error);
            });
    };

    const insertPelicula = (pelicula) => {
        axios.post('http://localhost:3000/peliculas', pelicula)
            .then(res => {
                console.log(res.data);
                navigate('/admin/peliculas');
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>{id ? 'Editar Película' : 'Agregar Nueva Película'}</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Nombre:</Form.Label>
                                        <Form.Control required value={nombre} type="text" onChange={(e) => setNombre(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un nombre.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Sinopsis:</Form.Label>
                                        <Form.Control required as="textarea" rows={3} value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese una sinopsis.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Fecha de Lanzamiento:</Form.Label>
                                        <Form.Control required type="date" value={fechaLanzamiento} onChange={(e) => setFechaLanzamiento(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese una fecha válida.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Calificación:</Form.Label>
                                        <Form.Control required type="number" min="1" max="100" value={calificacion} onChange={(e) => setCalificacion(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese una calificación válida (1-100).</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Trailer URL:</Form.Label>
                                        <Form.Control required type="url" value={trailer} onChange={(e) => setTrailer(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese una URL válida.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                    <Button type="submit">{id ? "Actualizar" : "Guardar"} Pelicula</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default FormPelicula;
