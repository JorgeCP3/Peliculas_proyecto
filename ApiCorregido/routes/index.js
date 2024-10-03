module.exports = app => {
    require("./persona.routes")(app);
    require("./pelicula.routes")(app);
    require("./persona_pelicula.routes")(app);
}