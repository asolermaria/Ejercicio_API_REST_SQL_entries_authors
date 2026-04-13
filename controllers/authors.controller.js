const authorsmodel = require("../models/authors.model");

// GET http://localhost:3000/api/authors
const getAuthors = async (req, res) => {
  let authors; //Será lo que se devuelva más adelante según qué caso

  const author = req.query.author; //Recoge el valor del parámetro author (si lo hubiera) de http://localhost:3000/api/authors/?author=ejemplo

  if (author) {
    authors = await authorsmodel.getAuthorByEmail(author);
  } else {
    authors = await authorsmodel.getAllAuthors();
  }
  res.status(200).json(authors); // [] con las entries encontradas
};

// POST http://localhost:3000/api/authors
// let newAuthor = {
//     "name": "Alejandru",
//     "surname": "Regex",
//     "email": "alejandru@thebridgeschool.es",
//     "image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
// }
const postAuthor = async (req, res) => {
  const newAuthor = req.body; // {id_author, name, surname, email, image}

  const {name, surname, email, image } = newAuthor;

  // Validar campos no vacíos {id_author, name, surname, email, image}
  if (!name || !surname || !email || !image) {
    return res.status(400).json({
      items_created: 0,
      data: newAuthor,
      error:
        "Faltan datos obligatorios: name, surname, email o image",
    });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      items_created: 0,
      data: newAuthor,
      error: "Formato de email no válido",
    });
  }

  try {
    const response = await authorsmodel.createAuthor(newAuthor);
    res.status(201).json({
      items_created: response,
      data: newAuthor,
      message: `Usuario creado: ${email}`
    });
  } catch (error) {
    res.status(400).json({
      items_created: 0,
      data: newAuthor,
      error: error.message,
    });
  }
};

// PUT http://localhost:3000/api/authors
// let editedAuthor = {
//     "id_author": 1,
//     "new_name": "Alejandru",
//     "new_surname": "Regex",
//     "new_email": "alejandru@thebridgeschool.es",
//     "new_image": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
// }
const updateAuthor = async (req, res) => {
  const editedAuthor = req.body; // {title,content,email,category}
  const { id_author, new_name, new_surname, new_email, new_image } =
    editedAuthor; //Destructuring dl objeto pasado por el body

  // Validar campos
  if (!id_author || !new_name || !new_surname || !new_email || !new_image) {
    return res.status(400).json({
      items_edited: 0,
      data: editedAuthor,
      error:
        "Faltan datos obligatorios: { id_author, new_name, new_surname, new_email, new_image }",
    });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (new_email && !emailRegex.test(new_email)) {
    return res.status(400).json({
      items_edited: 0,
      data: editedAuthor,
      error: "Formato de email no válido",
    });
  }

  // Validar si existe el id en la tabla authors
  const idCheck = await authorsmodel.idExists(id_author);
  if (idCheck.length === 0) {
    return res.status(404).json({
      items_edited: 0,
      data: editedAuthor,
      error: "El id_author no existe",
    });
  }

  try {
    const response = await authorsmodel.updateAuthor(editedAuthor);
    res.status(200).json({
      items_edited: response,
      data: editedAuthor,
      message: `Se ha modificado el autor con id: ${id_author}`
    });
  } catch (error) {
    res.status(400).json({
      items_edited: 0,
      data: editedAuthor,
      error: error.message,
    });
  }
};

// DELETE http://localhost:3000/api/authors
// let deleteAuthor = {
//     "id_author": 1
//}
const deleteAuthor = async (req, res) => {
  const deleteAuthor = req.body; // {title,content,email,category}
  const { id_author } = deleteAuthor; //Destructuring dl objeto pasado por el body};

  // Validar campos
  if (!id_author) {
    return res.status(400).json({
      items_deleted: 0,
      data: deleteAuthor,
      error: "Faltan datos obligatorios: { id_author }",
    });
  }

  // Validar si existe el id en la tabla authors
  const idCheck = await authorsmodel.idExists(id_author);
  if (idCheck.length === 0) {
    return res.status(404).json({
      items_deleted: 0,
      data: deleteAuthor,
      error: "El id_author no existe",
    });
  }


  try {
    const response = await authorsmodel.deleteAuthor(deleteAuthor);
    res.status(200).json({
      items_deleted: response,
      data: deleteAuthor,
      message: `Se ha borrado el autor con id: ${id_author}`
    });
  } catch (error) {
    res.status(400).json({
      items_deleted: 0,
      data: deleteAuthor,
      error: error.message,
    });
  }
};

module.exports = {
  getAuthors,
  postAuthor,
  updateAuthor,
  deleteAuthor
};
