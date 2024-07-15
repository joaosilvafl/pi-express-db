const pgp = require("pg-promise")(/* options */);

const db = pgp(`postgres://postgres:postgres@localhost:5432/inclusimap1`);

module.exports = db;
