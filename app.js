const express = require('express'); // Importando express
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3000;

//Habilitar recepción de JSON por mi backend
//Parsear el "body" entrante a JSON
//Middleware (operación intermedia)
app.use(express.json());

app.use(morgan('dev'));

//Importar rutas (router)
const entriesRoutes = require("./routes/entries.routes")
const authorsRoutes = require("./routes/authors.routes")

//El primer parámetro -> prefijo
app.use('/api/entries',entriesRoutes);
app.use('/api/authors',authorsRoutes);

//http://localhost:3000/
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});