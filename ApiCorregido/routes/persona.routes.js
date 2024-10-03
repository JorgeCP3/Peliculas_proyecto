module.exports = app => {
    let router = require("express").Router();
    const controllerPersona = require("../controllers/persona.controller.js");

    router.get("/", controllerPersona.listPersona);
    router.get("/:id", controllerPersona.getPersonaById);
    router.post("/", controllerPersona.createPersona);
    router.put("/:id", controllerPersona.updatePersonaPut);
    router.patch("/:id", controllerPersona.updatePersonaPatch);
    router.delete("/:id", controllerPersona.deletePersona);
    router.post("/:id/img", controllerPersona.uploadImage);

    app.use("/personas", router);
};