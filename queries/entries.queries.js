const queries = {
  getEntriesByEmail: `
        SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.image
        FROM entries AS e
        INNER JOIN authors AS a
        ON e.id_author=a.id_author
        WHERE a.email=$1
        ORDER BY e.title;`,
  getAllEntries: `
        SELECT e.title,e.content,e.date,e.category,a.name,a.surname,a.email
        FROM entries AS e
        INNER JOIN authors AS a
        ON e.id_author=a.id_author
        ORDER BY e.title;`,
};

module.exports = queries;
