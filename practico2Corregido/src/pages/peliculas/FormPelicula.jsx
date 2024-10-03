import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const FormPelicula = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [titulo, setNombre] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [fecha_de_estreno, setFechaLanzamiento] = useState("");
    const [rotten_tomatoes, setCalificacion] = useState("");
    const [trailer, setTrailer] = useState("");
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (!id) return;
        getPelicualById();
    }, [id]);

    const getPelicualById = async () => {
        axios.get(`http://localhost:3000/peliculas/${id}`)
        .then(res => {
            const pelicula = res.data;
            setNombre(pelicula.titulo);
            setSinopsis(pelicula.sinopsis);
            setFechaLanzamiento(moment(pelicula.fecha_de_estreno).format("YYYY-MM-DD"));
            setCalificacion(pelicula.rotten_tomatoes);
            setTrailer(pelicula.trailer);
        }).catch(err => {
            console.error(err);
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
        
        const trailerProcesado = procesarUrlTrailer(trailer);
    
        const pelicula = {
            titulo,
            sinopsis,
            fecha_de_estreno: fecha_de_estreno,
            rotten_tomatoes,
            trailer: trailerProcesado, 
        };
    
        if (id) {
            editPelicula(pelicula);
        } else {
            insertPelicula(pelicula);
        }
    };
    

    const procesarUrlTrailer = (url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        const videoId = urlParams.get('v');
        
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    };

    const insertPelicula = async (pelicula) => {
            console.log(pelicula);
        axios.post("http://localhost:3000/peliculas", pelicula)
        .then(() => {
            navigate("/admin/peliculas");
        }).catch(err => {
            console.error(err);
        });
    };

    const editPelicula = async (pelicula) => {
        axios.put(`http://localhost:3000/peliculas/${id}`, pelicula)
        .then(() => {
            navigate("/admin/peliculas");
        }).catch(err => {
            console.error(err);
        }
        );
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
                                        <Form.Control required value={titulo} type="text" onChange={(e) => setNombre(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese un nombre.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Sinopsis:</Form.Label>
                                        <Form.Control required as="textarea" rows={3} value={sinopsis} onChange={(e) => setSinopsis(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese una sinopsis.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Fecha de Lanzamiento:</Form.Label>
                                        <Form.Control required type="date" value={fecha_de_estreno} onChange={(e) => setFechaLanzamiento(e.target.value)} />
                                        <Form.Control.Feedback type="invalid">Por favor ingrese una fecha válida.</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Calificación:</Form.Label>
                                        <Form.Control required type="number" min="1" max="100" value={rotten_tomatoes} onChange={(e) => setCalificacion(e.target.value)} />
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
