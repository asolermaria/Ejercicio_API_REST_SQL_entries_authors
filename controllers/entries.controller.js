const entry = require("../models/entries.model");

const getEntries = async (req, res) => {
  let entries;

  const email = req.query.email;

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    return res.status(400).json({
      items_found: 0,
      email,
      error: "Formato de email no válido",
    });
  }
  if (email) {
    entries = await entry.getEntriesByEmail(req.query.email);
  } else {
    entries = await entry.getAllEntries();
  }
  res.status(200).json(entries); // [] con las entries encontradas
};


module.exports = {
  getEntries,
};