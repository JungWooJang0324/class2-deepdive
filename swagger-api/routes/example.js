const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// MySQL 연결 설정
const db = mysql.createConnection({
  host: '121.152.79.226',
  port: 13306,
  user: 'zicdding',
  password: 'zicdding',
  database: 'class2_deepdive',
});

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retrieve a list of students
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
 *     summary: Add a new student
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