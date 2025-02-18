const { localApi } = require("../../config/config_axios");
const express = require("express");
const router = express.Router();
const path = require("path");
/* GET users listing. */
router.get("/", async function (_req, res, next) {
    try {
        const resposta = await localApi.get("/api/v1/alunos");
        const alunos = resposta.data;
        const viewData = { title: "Cursos dos alunos", alunos };
        res.status(200).render("read", viewData);
    } catch (error) {
        res.json({ msg: error.message });
    }
});
router.get("/new", function (_req, res, next) {
    const viewData = {
        metodo: "POST",
        parametro: "create",
        title: "Novo Curso",
        buttonText: "Adicionar",
    };

    res.render("form", viewData);
});
router.get("/:matricula", async function (req, res, next) {
    const matricula = req.params.matricula;
    try {
        const response = await localApi.get("/api/v1/alunos/" + matricula);
        let aluno = response.data;
        let viewData = { aluno, title: "Detalhes do aluno" };
        res.status(200).render("card", viewData);
    } catch (error) {
        res.json({ msg: error.message });
    }
});
router.get("/edit/:matricula", async function (req, res, next) {
    const matricula = req.params.matricula;
    const apiURLPath = "/api/v1/alunos/" + matricula;
    const viewData = {
        metodo: "PUT",
        parametro: matricula,
        title: "Editar aluno",
        buttonText: "Atualizar aluno",
    };
    try {
        const resposta = await localApi.get(apiURLPath);
        const aluno = resposta.data;
        viewData.aluno = aluno;

        res.status(200).render("form", viewData);
    } catch (error) {
        res.json({ msg: error.message });
    }
});
router.post("/create", async function (req, res, next) {
    const data = req.body;
    const apiURLPath = "/api/v1/alunos/";
    try {
        await localApi.post(apiURLPath, data);
    } catch (error) {
    } finally {
        res.redirect("/alunos/");
    }
});
router.put("/matricula/", async function (req, res, next) {
    const matricula = req.params.matricula;
    const apiURLPath = "/api/v1/alunos/" + matricula;

    const data = req.body;

    try {
        await localApi.put(apiURLPath, data);
        res.redirect("/alunos/" + matricula);
    } catch (error) {
        res.redirect("/alunos/" + matricula);
    }
});
router.delete("/:matricula", async function (req, res, next) {
    const matricula = req.params.matricula;
    try {
        await localApi.delete("/api/v1/alunos/" + matricula);
    } catch (error) {
        res.json({ msg: error.message });
    } finally {
        res.redirect(303, "/alunos");
    }
});

module.exports = router;
