const { Pool } = require("pg"); // Importamos PostgreSQL para Node.js
const pool = require("../config/db_pgsql"); // Conexión con PostgreSQL

const queries = require("../queries/entries.queries"); // Queries SQL

// GET
const getEntriesByEmail = async (email) => {
  let client, result;
  try {
    client = await pool.connect(); // Abre conexión con la BBDD
    const data = await client.query(queries.getEntriesByEmail, [email]); //email sería equivalente a $1 en la query
    result = data.rows; // Resultado de la query
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

// GET
const getAllEntries = async () => {
  let client, result;
  try {
    client = await pool.connect(); // Abre conexión con la BBDD
    const data = await client.query(queries.getAllEntries);
    result = data.rows; // Resultado de la query
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const entries = {
  getAllEntries,
  getEntriesByEmail,
};

module.exports = entries;
