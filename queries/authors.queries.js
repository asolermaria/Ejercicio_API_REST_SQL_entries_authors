const queries = {
  createTableAuthors: `
    CREATE TABLE authors (
    id_author serial NOT NULL PRIMARY KEY, 
    name varchar(45) NOT NULL, 
    surname varchar(45) NOT NULL, 
    email varchar(100) NOT NULL UNIQUE,
    image varchar(255));`,
  dropTableAuthors: `
      DROP TABLE IF EXISTS authors;`,
  getAllAuthors: `SELECT * FROM authors`,
  getAuthorByEmail: `
    SELECT * FROM authors
    WHERE email = $1`,
  createAuthor: `
    INSERT INTO authors (name, surname, email, image) 
    VALUES ($1, $2, $3, $4)`,
  updateAuthor: `
    UPDATE authors
    SET name = $1, surname = $2, email= $3, image = $4
    WHERE id_author=$5`,
  deleteAuthor: `
    DELETE FROM authors
    WHERE id_author = $1`,
  emailExists: `
    SELECT * FROM authors
    WHERE email = $1
    LIMIT 1`,
  idExists: `
    SELECT * FROM authors
    WHERE id_author = $1
    LIMIT 1`,
};

module.exports = queries;
