import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../components/navMenu";

const FormRepartoPeliculas = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [personas, setPersonas] = useState([]);
    const [director, setDirector] = useState(''); // Para el director seleccionado
    const [reparto, setReparto] = useState([]); // Para los actores seleccionados
    const [pelicula, setPelicula] = useState(null); 
    const [repartoExistente, setRepartoExistente] = useState([]); // Almacena el reparto existente

    useEffect(() => {
        getPersonas();
        getPelicula();
        getRepartoExistente(); // Llama a la función para obtener el reparto existente
    }, []);

    const getPersonas = () => {
        axios.get('http://localhost:3000/reparto') 
            .then(res => {
                setPersonas(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getPelicula = () => {
        axios.get(`http://localhost:3000/peliculas/${id}`)
            .then(res => {
                setPelicula(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getRepartoExistente = () => {
        axios.get(`http://localhost:3000/peliculas/${id}/reparto`) // Asegúrate de tener esta ruta en tu API
            .then(res => {
                setRepartoExistente(res.data);
                // Si deseas mostrar el director o asignar el director desde aquí, puedes hacerlo.
            })
            .catch(error => {
                console.log(error);
            });
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        
        // Guardar el director
        const nuevoDirector = { 
            pelicula_id: id,
            reparto_id: director, 
            rol: 'Director', 
        };
    
        axios.post('http://localhost:3000/peliculaReparto', nuevoDirector)
            .then(res => {
                console.log('Director guardado:', res.data);
                
                // Ahora guarda cada actor del reparto
                const repartosS = reparto.map(actorId => {
                    const nuevoReparto = { 
                        pelicula_id: id,
                        reparto_id: actorId, 
                        rol: 'Actor', 
                    };
                    return axios.post('http://localhost:3000/peliculaReparto', nuevoReparto);
                });
    
                return Promise.all(repartosS);
            })
            .then(responses => {
                responses.forEach(response => console.log('Actor guardado:', response.data));
                alert('Reparto guardado con éxito'); // Muestra un mensaje de éxito
                navigate('/admin/peliculas');
            })
            .catch(error => {
                console.error(error);
                alert('Ocurrió un error al guardar el reparto'); // Muestra un mensaje de error
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
                                    <h2>
                                        {pelicula ? `Añadir Reparto a: ${pelicula.nombre}` : 'Cargando...'}
                                    </h2>
                                </Card.Title>
                                <Form onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Director:</Form.Label>
                                        <Form.Select value={director} onChange={(e) => setDirector(e.target.value)}>
                                            <option value="">Selecciona un Director</option>
                                            {personas.map(persona => (
                                                <option key={persona.id} value={persona.id}>{persona.nombre} {persona.apellido}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Reparto:</Form.Label>
                                        {personas.map(persona => (
                                            <Form.Check 
                                                key={persona.id} 
                                                type="checkbox" 
                                                label={`${persona.nombre} ${persona.apellido}`} 
                                                value={persona.id} 
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setReparto([...reparto, persona.id]);
                                                    } else {
                                                        setReparto(reparto.filter(id => id !== persona.id));
                                                    }
                                                }} 
                                            />
                                        ))}
                                    </Form.Group>

                                    {/* Mostrar reparto existente */}
                                    {repartoExistente.length > 0 && (
                                        <div className="mt-3">
                                            <h4>Reparto Existente:</h4>
                                            <ul>
                                                {repartoExistente.map(repartoItem => (
                                                    <li key={repartoItem.id}>{repartoItem.nombre} {repartoItem.apellido} - Rol: {repartoItem.rol}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar Reparto</Button>
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

export default FormRepartoPeliculas;
