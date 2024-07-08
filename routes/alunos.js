const express = require("express");
const router = express.Router();
var alunos = require("../tests/mocks/alunos.json");
const { routes } = require("../app");
const { log } = require("handlebars");
const { post } = require(".");
/* GET users listing. */
router.get("/", function (_req, res, next) {
    const data = {
        title: "Alunos",
        alunos: alunos.content,
    };
    res.render("read", data);
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
router.post("/create", function (req, res, next) {
    const novoAluno = req.body;
    const matricula = novoAluno.matricula;

    alunos.content[matricula] = {
        ...novoAluno,
        matricula: Number(matricula),
    };

    res.redirect("/alunos");
});

router.get("/:matricula", function (req, res, next) {
    const { matricula } = req.params;
    const aluno = alunos.content[matricula];
    res.render("card", { title: "Detalhe dos alunos", aluno });
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
