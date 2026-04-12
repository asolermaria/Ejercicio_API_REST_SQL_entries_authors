const express = require('express');

const entriesController = require("../controllers/entries.controller");
const router = express.Router();

router.get('/', entriesController.getEntries);

module.exports = router;