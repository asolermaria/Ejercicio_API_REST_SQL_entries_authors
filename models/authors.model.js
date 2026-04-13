const { Pool } = require("pg"); // Importamos PostgreSQL para Node.js
const pool = require("../config/db_pgsql"); // Conexión con PostgreSQL

const queries = require("../queries/authors.queries"); // Queries SQL

// GET
const getAuthorByEmail = async (email) => {
  let client, result;
  try {
    client = await pool.connect(); // Abre conexión con la BBDD
    const data = await client.query(queries.getAuthorByEmail, [email]); //email sería equivalente a $1 en la query
    result = data.rows; // Resultado de la query
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const getAllAuthors = async () => {
  let client, result;
  try {
    client = await pool.connect(); // Abre conexión con la BBDD
    const data = await client.query(queries.getAllAuthors);
    result = data.rows; // Resultado de la query
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

// CREATE
const createAuthor = async (author) => {
    const { name, surname, email, image } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createAuthor,[name, surname, email, image])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// UPDATE
const updateAuthor = async (author) => {
    const { id_author, new_name, new_surname, new_email, new_image } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateAuthor,[new_name, new_surname, new_email, new_image, id_author])
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
const deleteAuthor = async (author) => {
    const { id_author } = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteAuthor,[id_author])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// Validacion si existe email en la tabla
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

// Validacion si existe id en la tabla
const idExists = async (id) => {
  let client, result;
  try {
    client = await pool.connect(); // Abre conexión con la BBDD
    const data = await client.query(queries.idExists, [id]); //email sería equivalente a $1 en la query
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
  getAllAuthors,
  getAuthorByEmail,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  emailExists,
  idExists
};

module.exports = authors;
