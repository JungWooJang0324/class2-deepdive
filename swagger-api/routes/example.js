// routes/example.js

/**
 * @swagger
 * /api/v1/example:
 *   get:
 *     summary: Example endpoint
 *     description: Returns a simple message.
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Hello, World!
 */
app.get('/api/v1/example', (req, res) => {
  res.send('Hello, World!');
});
