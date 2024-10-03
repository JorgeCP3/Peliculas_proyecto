module.exports = app => {
    let router = require("express").Router();
    const controllerPersonaPelicula = require("../controllers/persona_pelicula.controller.js");

    //add persona to pelicula
    router.post("/", controllerPersonaPelicula.createPersonaPelicula);
    //delete persona from pelicula
    router.delete("/:id", controllerPersonaPelicula.deletePersonaPelicula);

    app.use("/reparto", router);
}