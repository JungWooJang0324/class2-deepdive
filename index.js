require('dotenv').config();
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
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
      title: 'Deepdive - Swagger API',
      version: '1.0.0',
      description: '	•	GET: http://localhost:3000/api/v1/students   POST: http://localhost:3000/api/v1/students',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 라우터 연결
const router = require('./routes/example');
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger API docs available at http://localhost:${port}/api-docs`);
});