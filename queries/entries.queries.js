const queries = {
  createTableEntries: `
      CREATE TABLE entries (
      id_entry serial NOT NULL PRIMARY KEY, 
      title varchar(100) NOT NULL, 
      content text NOT NULL, 
      date date DEFAULT CURRENT_DATE,
      id_author int,
      category varchar(15),
      FOREIGN KEY (id_author) REFERENCES authors(id_author));`,
  dropTableEntries: `
      DROP TABLE IF EXISTS entries;`,
  getEntriesByEmail: `
        SELECT e.title, e.content, e.date, e.category, a.name, a.surname, a.email, a.image
        FROM entries AS e
        INNER JOIN authors AS a
        ON e.id_author=a.id_author
        WHERE a.email= $1
        ORDER BY e.title;`,
  getAllEntries: `
        SELECT e.title, e.content, e.date, e.category, a.name, a.surname, a.email, a.image
        FROM entries AS e
        INNER JOIN authors AS a
        ON e.id_author=a.id_author
        ORDER BY e.title;`,
  updateEntry: `
        UPDATE entries
        SET title=$1, content=$2, date=NOW(), 
        id_author=(SELECT id_author FROM authors WHERE email=$3), category=$4
        WHERE title=$5`,
  deleteEntry: `
        DELETE FROM entries
        WHERE title = $1`,
  titleExists: `
        SELECT * FROM entries
        WHERE title = $1
        LIMIT 1`,
};

module.exports = queries;
