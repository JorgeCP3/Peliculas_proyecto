import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, ListGroup } from "react-bootstrap";
import NavMenuUser from "../../components/NavMenuUser";

const PeliculaDetalles = () => {
    const { id } = useParams();
    const [titulo, setTitulo] = useState("");
    const [sinopsis, setSinopsis] = useState("");
    const [fecha_de_estreno, setFechaLanzamiento] = useState("");
    const [rotten_tomatoes, setCalificacion] = useState("");
    const [trailer, setTrailer] = useState("");
    const [director, setDirector] = useState(null); 
    const [reparto, setReparto] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener detalles de la película
                const peliculaResponse = await axios.get(`http://localhost:3000/peliculas/${id}`);
                const pelicula = peliculaResponse.data;
                setTitulo(pelicula.titulo);
                setSinopsis(pelicula.sinopsis);
                setFechaLanzamiento(pelicula.fecha_de_estreno);
                setCalificacion(pelicula.rotten_tomatoes);
                setTrailer(pelicula.trailer); 

                const repartoResponse = await axios.get(`http://localhost:3000/peliculas/${id}/reparto`);
                const repartoData = repartoResponse.data;

                setDirector(repartoData.find(persona => persona.rol === "Director"));
                setReparto(repartoData.filter(persona => persona.rol === "Actor")); 

            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchData();
    }, [id]);

    if (!titulo) {
        return <p>Cargando detalles de la película...</p>; 
    }

    return (
        <>
            <NavMenuUser />
            <Container className="mt-3">
                <Row>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{titulo}</Card.Title>
                                <Card.Text>{sinopsis}</Card.Text>
                                <Card.Text>
                                    <strong>Fecha de Estreno:</strong> {new Date(fecha_de_estreno).toLocaleDateString()}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Rotten Tomatoes:</strong> {rotten_tomatoes}%
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Trailer</Card.Title>
                                <div className="trailer-container" style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
                                    <iframe 
                                        title="Trailer de la película"
                                        src={trailer} 
                                        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Sección para mostrar el director */}
                <Row className="mt-4">
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Director</Card.Title>
                                {director ? (
                                    <Card.Text>
                                        {director.nombre_completo}
                                    </Card.Text>
                                ) : (
                                    <Card.Text>No se encontró director.</Card.Text>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Sección para mostrar el reparto */}
                <Row className="mt-4">
                    <Col md={12}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Reparto</Card.Title>
                                {reparto.length > 0 ? (
                                    <ListGroup>
                                        {reparto.map(actor => (
                                            <ListGroup.Item key={actor.id_persona}>
                                                {actor.nombre_completo}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <Card.Text>No se encontró reparto.</Card.Text>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default PeliculaDetalles;
