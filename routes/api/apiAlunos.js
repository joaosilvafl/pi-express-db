const db = require("../../config/config_database");
const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", async function (_req, res, next) {
    const query = "SELECT * FROM alunos";
    try {
        const data = await db.any(query);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
router.get("/:matricula", function (req, res, next) {
    const { matricula } = req.params;
    const query = `SELECT * 
    FROM alunos 
    WHERE  matricula = $1`;
    try {
        const aluno = alunos.content[matricula];
        res.status(200).json(aluno);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
router.post("/", async function (req, res, next) {
    const nome = req.body.nome;
    const matricula = req.body.matricula;
    const email = req.body.email;
    const data_nascimento = req.body.data_nascimento;

    const query = `
    INSERT INTO alunos (matricula, nome, email, data_nascimento)
    VALUES ($1,$2,$3,$4)
    `;
    const values = [matricula, nome, email, data_nascimento];
    try {
        const data = await db.any(query, values);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
router.put("/:matricula/", function (req, res, next) {
    const novoAluno = req.body;
    const matricula = req.params.matricula;
    alunos.content[matricula] = { ...novoAluno, matricula };
    const query = `
    UPDATE alunos
    SET
    nome = $2,
    email = $3,
    data_nascimento = $3, 
    WHERE matricula=$1
    `;
    const response = {
        msg: "Aluno atualizado com sucesso",
        aluno: alunos.content[matricula],
    };

    res.status(200).json(response);
});
router.delete("/:matricula", function (req, res, next) {
    const matricula = req.params.matricula;
    delete alunos.content[matricula];
    const query = `DELETE FROM alunos WHERE matricula = $1`;
    const response = {
        msg: "Aluno removido",
        aluno: alunos.content[matricula],
    };

    res.status(200).json(response);
});

module.exports = router;
