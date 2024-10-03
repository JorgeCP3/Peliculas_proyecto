import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormAddReparto = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [errorText, setErrorText] = useState('')
    const [validated, setValidated] = useState(false);

    const [directorId, setDirectorId] = useState('');
    const [listaPersonas, setListaPersonas] = useState([]);
    const [listaDeActores, setListaDeActores] = useState([]);

    useEffect(() => {
        if (!id) return;
        getListaPersonas();
    }, [id])

    const getListaPersonas = () => {
        axios.get('http://localhost:3000/personas')
            .then(res => {
                setListaPersonas(res.data);
            }).catch(error => {
                console.log(error);
            });
    }

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        setValidated(true);
        if (form.checkValidity() === false) {
            return;
        }
        setErrorText('');
        const reparto = {
            pelicula_id: id,
            director_id: directorId,
            actores: listaDeActores
        }
        axios.post('http://localhost:3000/reparto', reparto)
        .then(res => {
            console.log(res.data, "Respuesta del ingreso");
            navigate('/admin/peliculas');
        })
        .catch(error => {
            console.log(error.response ? error.response.data : error.message, "Error al guardar los datos.");
            setErrorText('Hubo un problema al guardar el reparto. Intenta nuevamente.');
        });
        axios.delete(`http://localhost:3000/reparto/${id}`)
            .then(res => {
                console.log(res.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const onActorChange = (e, actor) => {
        if (e.target.checked) {
            setListaDeActores([...listaDeActores, actor.id]);
        } else {
            setListaDeActores(listaDeActores.filter(a => a.id !== actor.id));
        }
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
                                    <h2>Formulario Pelicula</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    {errorText && <Alert variant="danger">{errorText}</Alert>}
                                    <Form.Group >
                                        <Form.Label>Director:</Form.Label>
                                        <Form.Select required value={directorId} onChange={(e) => {
                                            setDirectorId(e.target.value);
                                        }} >
                                            <option value="" disabled>Seleccione un Director...</option>
                                            {listaPersonas.map(persona =>
                                                <option key={"user-" + persona.id} value={persona.id}>{persona.nombre_completo}</option>
                                            )}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un usuario.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Actores:</Form.Label>
                                        {listaPersonas.map(actor =>
                                            <Form.Check
                                                key={"actor-" + actor.id}
                                                type="checkbox"
                                                label={actor.nombre_completo}
                                                onChange={(e) => onActorChange(e, actor)}
                                            />
                                        )}
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar datos</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>);
}

export default FormAddReparto;