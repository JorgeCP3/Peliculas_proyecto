import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormPersona = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [nombre_completo, setNombre] = useState(''); 
    const [validated, setValidated] = useState(false); 

    useEffect(() => {
        if (!id) return;
        getPersonaById();
    }, [id]);

    const getPersonaById = async () => {
        axios.get(`http://localhost:3000/personas/${id}`)
            .then(res => {
                const persona = res.data;
                setNombre(persona.nombre_completo);
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
        const persona = {
            nombre_completo,
        };

        if (id) {
            editPersona(persona);
        } else {
            insertPersona(persona);
        }
    };

    const insertPersona = (persona) => {
        axios.post("http://localhost:3000/personas", persona)
            .then(res => {
                console.log(res.data);
                navigate("/admin/personas");
            }).catch(err => {
                console.error(err);
            });
    }

    const editPersona = (persona) => {
        axios.put(`http://localhost:3000/personas/${id}`, persona)
            .then(res => {
                console.log(res.data);
                navigate("/admin/personas");
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
                                    <h2>{id ? 'Editar Persona' : 'Agregar Nueva Persona'}</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Nombre Completo:</Form.Label>
                                        <Form.Control 
                                            required 
                                            value={nombre_completo} 
                                            type="text" 
                                            onChange={(e) => setNombre(e.target.value)} 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un nombre.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">{id ? "Actualizar" : "Guardar"} Persona</Button>
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

export default FormPersona;
