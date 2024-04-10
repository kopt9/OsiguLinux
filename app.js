const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const citasRouter = require('./src/routes/citas');
const cors = require('cors');
const path=require("path")

app.use(cors());
app.use(express.json());
app.use('/scheduling/v1/appointments', citasRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

//app.use(express.static(__dirname));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentación de API',
      version: '1.0.0',
      description: 'Documentación de API para confirmar y cancelar citas',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'hnshnfs889ssdnddndnd"'
        }
      }
    },
     servers:[
      {
        url:"http://localhost:3000/"
      }
    ]
  },
  apis: ['./src/routes/*.js'], // Rutas a los archivos que contienen comentarios Swagger
  //apis: [`'${path.join(__dirname,"./routes/*.js")}`],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
//app.use('/api', citasRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});