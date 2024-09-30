import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PeliculaDetalles = () => {
    const { id } = useParams();
    const [pelicula, setPelicula] = useState(null);

    useEffect(() => {
        const fetchPelicula = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/peliculas/${id}`);
                setPelicula(response.data);
            } catch (error) {
                console.error('Error al obtener la película:', error);
            }
        };

        fetchPelicula();
    }, [id]);

    if (!pelicula) return <div>Cargando...</div>;

    return (
        <div>
            <h1>{pelicula.nombre}</h1>
            <img src={`/images/peliculas/${pelicula.id}.jpg`} alt={pelicula.nombre} />
            <p><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>
            <p><strong>Director:</strong> {pelicula.director.nombre}</p> {}
            <p><strong>Reparto:</strong></p>
            <ul>
                {pelicula.reparto.map((actor) => (
                    <li key={actor.id}>{actor.nombre}</li> 
                ))}
            </ul>
        </div>
    );
};

export default PeliculaDetalles;
