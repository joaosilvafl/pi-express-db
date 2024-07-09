const { localApi } = require("../config/config_axios");
const express = require("express");
const router = express.Router();
var alunos = require("../tests/mocks/alunos.json");
const { routes } = require("../app");
const { log } = require("handlebars");
const { post } = require(".");
/* GET users listing. */
router.get("/", async function (_req, res, next) {
    try {
        const response = await localApi.get("/api/v1/alunos");
        console.log(response);
        const alunos = response.data.content;
        // const { data: alunos } = await localApi.get("/api/v1/alunos");
        const data = { title: "Alunos", alunos };

        res.status(200).render("read", data);
    } catch (error) {
        res.json({ msg: error.message });
    }
});
router.get("/new", function (_req, res, next) {
    const parametro = "create";
    const data = {
        metodo: "POST",
        parametro,
        title: "Novo aluno",
        buttonText: "Adicionar aluno",
    };

    res.render("forms", data);
});
router.get("/:matricula", async function (req, res, next) {
    const { matricula } = req.params;
    try {
        const { data: aluno } = await localApi.get("/alunos/", matricula);
        res.status(200).render("card", { aluno, title: "Detalhes do aluno" });
    } catch (error) {
        res.json({ msg: error.message });
    }
});
router.get("/edit/:matricula", function (req, res, next) {
    const { matricula } = req.params;
    const parametro = matricula;
    const aluno = alunos.content[matricula];
    const data = {
        metodo: "PUT",
        parametro,
        title: "Editar aluno",
        buttonText: "Salvar Alterações",
    };

    res.render("forms", data);
});
router.post("/create", function (req, res, next) {
    const novoAluno = req.body;
    const matricula = novoAluno.matricula;

    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula),
    };

    res.redirect("/alunos");
});
router.put("/matricula/", function (req, res, next) {
    const { matricula } = req.params;
    const novoAluno = req.body;
    alunos.content[matricula] = { ...novoAluno, matricula: Number(matricula) };
    // res.send(rq.body);
    res.redirect("/alunos");
});
router.delete("/:matricula", function (req, res, next) {
    const { matricula } = req.params;
    delete alunos.content[matricula];
    res.redirect(303, "/alunos");
});

module.exports = router;
