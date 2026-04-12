const { Pool } = require("pg"); // Importamos PostgreSQL para Node.js
const pool = require("../config/db_pgsql"); // Conexión con PostgreSQL

const queries = require("../queries/authors.queries"); // Queries SQL

const emailExists = async (email) => {
  let client, result;
  try {
    client = await pool.connect(); // Abre conexión con la BBDD
    const data = await client.query(queries.emailExists, [email]); //email sería equivalente a $1 en la query
    result = data.rows; // Resultado de la query
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const authors = {
  emailExists,
};

module.exports = authors;