const db = require("../../config/config_database");
const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", async function (_req, res, next) {
    const query = `SELECT matricula, situacao, alunos.nome_aluno,cursos.descricao_curso
    FROM alunos_cursos 
    JOIN alunos ON alunos.id_aluno = alunos_cursos.fk_aluno
    JOIN cursos ON cursos.id_curso = alunos_cursos.fk_curso`;
    try {
        const data = await db.any(query);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
router.get("/:matricula", async function (req, res, next) {
    const matricula = req.params.matricula;
    const values = [matricula];
    const query = `SELECT * 
    FROM alunos_cursos
    WHERE  matricula = $1`;
    try {
        const aluno = await db.one(query, values);
        res.status(200).json(aluno);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
router.post("/", async function (req, res, next) {
    const matricula = req.body.matricula;
    const situacao = req.body.situacao;
    const fk_aluno = req.body.fk_aluno;
    const fk_curso = req.body.fk_curso;

    const query = `
    INSERT INTO alunos_cursos (matricula, situacao, fk_aluno, fk_curso)
    VALUES ($1,$2,$3,$4)
    `;
    const values = [matricula, situacao, fk_aluno, fk_curso];
    try {
        const data = await db.any(query, values);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
router.put("/:matricula/", async function (req, res, next) {
    const matricula = req.params.matricula;
    const situacao = req.body.situacao;
    const fk_aluno = req.body.fk_aluno;
    const fk_curso = req.body.fk_curso;
    const values = [matricula, situacao, fk_aluno, fk_curso];

    const query = `
    UPDATE alunos_cursos
    SET
    situacao = $2,
    fk_aluno = $3,
    fk_curso = $4 
    WHERE matricula = $1
    `;
    try {
        const aluno = await db.any(query, values);
        res.status(201).json(aluno);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
router.delete("/:matricula", async function (req, res, next) {
    const matricula = req.params.matricula;
    const values = matricula;
    const query = `DELETE FROM alunos_cursos WHERE matricula=$1`;
    try {
        const data = await db.any(query, values);
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ msg:"aluno não removido"});
    }
});

module.exports = router;
