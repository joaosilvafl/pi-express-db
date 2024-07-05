const express = require("express");
const router = express.Router();
var alunos = require("../tests/mocks/alunos.json");
const { routes } = require("../app");
const { log } = require("handlebars");
/* GET users listing. */
router.get("/", function (_req, res, next) {
    const data = {
        title: "Alunos",
        alunos: alunos.content,
    };
    res.render("read", data);
});
router.get("/new", function (_req, res, next) {
    res.render("forms", { title: "Novo aluno", buttonText: "Adicionar Aluno" });
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
    const aluno = alunos.content[matricula];
    res.render("forms", {
        title: "Editar aluno",
        buttonText: "Salvar Alteraçoes",
        aluno,
    });
});
module.exports = router;
