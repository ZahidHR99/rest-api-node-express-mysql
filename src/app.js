// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use('/items', itemRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
