module.exports = app => {
    require('./peliculas.routes')(app);
    require('./reparto.routes')(app);
    require('./peliculaReparto.routes')(app);
}