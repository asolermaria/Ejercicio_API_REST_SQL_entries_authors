const entry = require("../models/entries.model");
const author = require("../models/authors.model");

// GET http://localhost:3000/api/entries
// GET http://localhost:3000/api/entries/?email=ejemplo@gmail.com
const getEntries = async (req, res) => {
  let entries; //Será lo que se devuelva más adelante según qué caso

  const email = req.query.email; //Recoge el valor del parámetro email (si lo hubiera) de http://localhost:3000/api/entries/?email=ejemplo@gmail.com

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

// PUT http://localhost:3000/api/entries
// let editedEntry = {
//     title : "Se acabaron las magdalenas",
//     new_title: "Noticia: Un panda suelto por la ciudad",
//     new_content: "Corren rumores de que papa noel tenía un saco vacio y lo llenó",
//     new_email: "alejandru@thebridgeschool.es",
//     new_category: "sucesos"
// }
const updateEntry = async (req, res) => {
  const editedEntry = req.body; // {title,content,email,category}
  const { title, new_title, new_content, new_email, new_category } =
    editedEntry; //Destructuring dl objeto pasado por el body

  // Validar campos
  if (!title || !new_title || !new_content || !new_email || !new_category) {
    return res.status(400).json({
      items_edited: 0,
      data: editedEntry,
      error:
        "Faltan datos obligatorios: { new_title, title, new_content, new_email, new_category }",
    });
  }

  // Validar si existe el titulo en la tabla
  const titleCheck = await entry.titleExists(title);
  if (titleCheck.length === 0) {
    return res.status(404).json({
      items_edited: 0,
      data: editedEntry,
      error: "El titulo no existe",
    });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (new_email && !emailRegex.test(new_email)) {
    return res.status(400).json({
      items_edited: 0,
      data: editedEntry,
      error: "Formato de email no válido",
    });
  }

  // Validar si existe el email en la tabla authors
  const emailCheck = await author.emailExists(new_email);
  if (emailCheck.length === 0) {
    return res.status(404).json({
      items_edited: 0,
      data: editedEntry,
      error: "El email no existe",
    });
  }
  
  try {
    const response = await entry.updateEntry(editedEntry);
    res.status(200).json({
      items_edited: response,
      data: editedEntry,
      message: `Se ha modificado la entry: ${title}`
    });
  } catch (error) {
    res.status(400).json({
      items_edited: 0,
      data: editedEntry,
      error: error.message,
    });
  }
};

// DELETE http://localhost:3000/api/entries
// let deleteEntry = {
//     title : "Se acabaron las magdalenas"
//}
const deleteEntry = async (req, res) => {
  const deleteEntry = req.body; // {title,content,email,category}
  const { title } = deleteEntry; //Destructuring dl objeto pasado por el body};

  // Validar campos
  if (!title) {
    return res.status(400).json({
      items_deleted: 0,
      data: deleteEntry,
      error: "Faltan datos obligatorios: { title }",
    });
  }

  // Validar si existe el titulo en la tabla
  const titleCheck = await entry.titleExists(title);
  if (titleCheck.length === 0) {
    return res.status(404).json({
      items_deleted: 0,
      data: deleteEntry,
      error: "El titulo no existe",
    });
  }

  try {
    const response = await entry.deleteEntry(deleteEntry);
    res.status(200).json({
      items_deleted: response,
      data: deleteEntry,
      message: `Se ha borrado la entry ${title}`
    });
  } catch (error) {
    res.status(400).json({
      items_deleted: 0,
      data: deleteEntry,
      error: error.message,
    });
  }
};

module.exports = {
  getEntries,
  updateEntry,
  deleteEntry,
};
