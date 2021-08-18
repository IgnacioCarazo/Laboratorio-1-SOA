const express = require("express");
const cors = require("cors");
const https = require("https");
const app = express();
const fs = require("fs");
const path = require("path");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

app.use(cors());
app.use(express.json());

const parqueo = [];

// Extended https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Parqueo TEC",
      description:
        "API para controlar los espacios, reservaciones y carros dentro del parqueo TEC",
      contact: {
        name: "Ignacio Carazo",
      },
      servers: ["https://localhost:3443"],
    },
  },
  apis: ["index.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get("/", (req, res) => {
  res.send("Welcome to REST API with Node.js!!");
});

/**
 * @swagger
 * /spaces:
 *  get:
 *      description: Utilizar para obtener los espacios que existen en el parqueo
 */
app.get("/spaces", (req, res) => {
  res.send(parqueo);
});

/**
 * @swagger
 * /spaces/id:
 *  get:
 *      description: Utilizar para obtener la informacion de un espacio en especifico
 */
app.get("/spaces/:id", (req, res) => {
  const espacio = parqueo.find((c) => c.id === parseInt(req.params.id));

  if (!espacio) {
    res.status(404).send({ status: "Espacio no encontrado" });
  } else {
    res.send(espacio);
  }
});

/**
 * @swagger
 * /spaces:
 *  post:
 *      description: Utilizar para crear un nuevo espacio en el parqueo
 */
app.post("/spaces", (req, res) => {
  const espacio = {
    state: "free",
    placa: "",
    fecha: new Date(),
    id: parqueo.length + 1,
  };

  parqueo.push(espacio);
  res.send(espacio);
});

/**
 * @swagger
 * /spaces/id:
 *  put:
 *      description: Utilizar para modificar los datos del espacio como se crearon en el POST.
 */
app.put("/spaces/:id", (req, res) => {
  const espacio = parqueo.find((c) => c.id === parseInt(req.params.id));
  if (!espacio) {
    res.status(404).send({ status: "Espacio no encontrado" });
  } else {
    espacio.placa = req.body.placa;
    espacio.fecha = new Date();
    espacio.state = "taken";
    res.send(espacio);
  }
});

/**
 * @swagger
 * /spaces/id:
 *  delete:
 *      description: Utilizar para eliminar un espacio del parqueo
 */
app.delete("/spaces/:id", (req, res) => {
  const espacio = parqueo.find((c) => c.id === parseInt(req.params.id));
  if (!espacio) {
    res.status(404).send({ status: "Espacio no encontrado" });
  }
  if (espacio.state === "free") {
    const index = parqueo.indexOf(espacio);
    parqueo.splice(index, 1);

    res.send(espacio);
  } else {
    res.send({ status: "Espacio ocupado" });
  }
});

/**
 * @swagger
 * /reservations:
 *  get:
 *      description: Utilizar para ver los vehiculos hay en el parqueo
 */
app.get("/reservations", (req, res) => {
  const ocupados = parqueo.filter((espacio) => {
    espacio.state === "taken";
  });
  res.send(ocupados);
});

/**
 * @swagger
 * /reservations/placa:
 *  post:
 *      description: Utilizar para reservar un espacio con la placa de un vehiculo
 */
app.post("/reservations/:placa", (req, res) => {
  const placa = req.params.placa;
  console.log(placa);
  let flag = false;
  for (let espacio of parqueo) {
    if (espacio.state === "free") {
      espacio.placa = placa;
      espacio.state = "taken";
      _espacio = espacio;
      flag = true;
      break;
    }
  }
  if (!flag) {
    res
      .status(404)
      .send({ status: "No hay espacios disponibles para reservar" });
  } else {
    res.send(placa);
  }
});

/**
 * @swagger
 * /reservations/id:
 *  post:
 *      description: Utilizar para eliminar una reservacion
 */
app.delete("/reservations/:id", (req, res) => {
  const espacio = parqueo.find((c) => c.id === parseInt(req.params.id));
  if (!espacio) {
    res.status(404).send({ status: "Espacio no encontrado" });
  } else {
    espacio.fecha = "";
    espacio.placa = "";
    espacio.state = "free";
    req.send(espacio);
  }
});

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);

const port = process.env.PORT || 3443;
sslServer.listen(port, () =>
  console.log(`Secure Server listening on port ${port}.`)
);
