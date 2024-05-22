const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MySQL 연결 설정
const db = mysql.createConnection({
  host: '121.152.79.226',
  port: 13306,
  user: 'zicdding',
  password: 'zicdding',
  database: 'class2_deepdive',
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Swagger 설정
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger API Example',
      version: '1.0.0',
      description: 'A simple Express Swagger API example',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const router = require('./routes/example');
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger API docs available at http://localhost:${port}/api-docs`);
});