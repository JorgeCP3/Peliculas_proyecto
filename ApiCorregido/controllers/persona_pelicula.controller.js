const db = require("../models");
const { sendError500 } = require("../utils/request.utils");

exports.createPersonaPelicula = async (req, res) => {
    try {
        console.log("Cuerpo de la solicitud:", req.body); 
        
        const director = {
            id_persona: req.body.director_id, 
            id_pelicula: req.body.pelicula_id,
            rol: "Director"
        };
        const directorResult = await db.persona_peliculas.create(director); 
        
        for (let i = 0; i < req.body.actores.length; i++) {
            const actor = {
                id_persona: req.body.actores[i],
                id_pelicula: req.body.pelicula_id,
                rol: "Actor"
            };
            await db.persona_peliculas.create(actor);
        }

        res.status(201).json({ director: directorResult, mensaje: "Reparto creado exitosamente." });
    } catch (error) {
        sendError500(res, error);
    }
};

exports.deletePersonaPelicula = async (req, res) => {
    const idDelete = req.params.id; 
    try {
        const resultDelete = await db.persona_peliculas.destroy({
            where: { id: idDelete }
        });
        
        if (resultDelete) {
            console.log("Resultado de la eliminación:", resultDelete);
            res.status(200).json({ mensaje: "Eliminación exitosa." });
        } else {
            res.status(404).json({ mensaje: "No se encontró el registro a eliminar." });
        }
    } catch (error) {
        console.log("Error:", error);
        sendError500(res, error);
    }
};



