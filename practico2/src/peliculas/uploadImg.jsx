import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UploadImg = () => {
    const navigate = useNavigate();
    const { id } = useParams();  
    const [imageFile, setImageFile] = useState(null);  
    const [validated, setValidated] = useState(false);  

    const onChangeImage = (e) => {
        setImageFile(e.target.files[0]);
    };

    const onSaveClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);  

        axios.post(`http://localhost:3000/pelicula/upload/${id}`, formData)
            .then(res => {
                console.log(res.data);
                navigate(`/peliculas`); 
            })
            .catch(error => {
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
                                    <h2>Subir Imagen de la Película</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onSaveClick}>
                                    <Form.Group>
                                        <Form.Label>Seleccione una imagen:</Form.Label>
                                        <Form.Control 
                                            required 
                                            type="file" 
                                            onChange={onChangeImage} 
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un archivo.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Imagen</Button>
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

export default UploadImg;
