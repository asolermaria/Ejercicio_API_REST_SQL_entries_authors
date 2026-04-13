const express = require('express');

const authorsController = require("../controllers/authors.controller");
const router = express.Router();

router.get('/', authorsController.getAuthors);
router.post('/', authorsController.postAuthor);
router.put('/', authorsController.updateAuthor);
router.delete('/', authorsController.deleteAuthor);

module.exports = router;