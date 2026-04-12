const queries = {
  emailExists: `
    SELECT * FROM authors
    WHERE email = $1
    LIMIT 1`
};

module.exports = queries;