const express = require("express");
const fileUpload = require('express-fileupload');
const cookieparser  = require("cookie-parser");
const { Sequelize } = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const Database = require('./config/db');

const app = express();
const PORT = process.env.API_PORT || 1337;

dotenv.config({ path: './config/.env' });
dotenv.config(); // Cargar las variables de entorno de .env



const db = new Database();


//Controllers

const UsuarioController = require("./controllers/usuarioController")


app.use(function (req, res, next) {
  let dominiosPermitidos = process.env.DOMINIOS
  if (dominiosPermitidos.includes(req.headers.origin)) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  res.setHeader('Access-Control-Allow-Credentials', true)

  next()
});

app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.json());

//Controllers
app.use('/api/v1/Usuario', UsuarioController)


app.use("/", (req,res,next) => {
  res.send("Route main")
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
