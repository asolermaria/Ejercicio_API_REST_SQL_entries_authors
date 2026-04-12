const express = require('express'); // Importando express
const app = express();
const port = 3000;

//Habilitar recepción de JSON por mi backend
//Parsear el "body" entrante a JSON
//Middleware (operación intermedia)
app.use(express.json());

//Importar rutas (router)
const entriesRoutes = require("./routes/entries.routes")

//El primer parámetro -> prefijo
app.use('/api/entries',entriesRoutes);

//http://localhost:3000/
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});