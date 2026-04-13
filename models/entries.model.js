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

// UPDATE
const updateEntry = async (entry) => {
    const { title, new_title, new_content, new_email, new_category } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateEntry,[new_title, new_content, new_email, new_category, title])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// DELETE
const deleteEntry = async (entry) => {
    const { title } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteEntry,[title])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// Validacion si existe titulo en la tabla
const titleExists = async (title) => {
  let client, result;
  try {
    client = await pool.connect(); // Abre conexión con la BBDD
    const data = await client.query(queries.titleExists, [title]); //email sería equivalente a $1 en la query
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
  updateEntry,
  titleExists,
  deleteEntry
};

module.exports = entries;
