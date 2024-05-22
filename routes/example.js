require('dotenv').config();
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

/**
 * @swagger
 * /students:
 *   get:
 *     summary: 학생리스트 출력
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Alice
 *                   age:
 *                     type: integer
 *                     example: 21
 */
router.get('/students', (req, res) => {
  let sql = 'SELECT * FROM jjw_student';
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

/**
 * @swagger
 * /students:
 *   post:
 *     summary: 학생 추가
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Bob
 *               age:
 *                 type: integer
 *                 example: 22
 *     responses:
 *       201:
 *         description: Successfully created
 */
router.post('/students', (req, res) => {
  const { name, age } = req.body;
  let sql = 'INSERT INTO jjw_student (name, age) VALUES (?, ?)';
  db.query(sql, [name, age], (err, result) => {
    if (err) {
      throw err;
    }
    res.status(201).send(`Student added with ID: ${result.insertId}`);
  });
});

module.exports = router;