module.exports = app => {
    let router = require("express").Router();
    const controllerPelicula = require("../controllers/pelicula.controller.js");

    router.get("/", controllerPelicula.listPelicula);
    router.get("/:id", controllerPelicula.getPeliculaById);
    router.post("/", controllerPelicula.createPelicula);
    router.put("/:id", controllerPelicula.updatePeliculaPut);
    router.patch("/:id", controllerPelicula.updatePeliculaPatch);
    router.delete("/:id", controllerPelicula.deletePelicula);
    //upload image
    router.post("/:id/img", controllerPelicula.uploadImage);

    app.use("/peliculas", router);
};