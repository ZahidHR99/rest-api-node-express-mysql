// src/services/itemService.js
const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'mydatabase',
});

const query = util.promisify(pool.query).bind(pool);

exports.getAllItems = async () => {
  const rows = await query('SELECT * FROM items');
  return rows;
};

exports.getItemById = async (id) => {
  const rows = await query('SELECT * FROM items WHERE id = ?', [id]);
  return rows[0];
};

exports.createItem = async (name, description) => {
  const result = await query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description]);
  const insertedId = result.insertId;
  return { id: insertedId, name, description };
};

exports.updateItem = async (id, name, description) => {
  const result = await query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, id]);
  if (result.affectedRows === 0) {
    return null;
  }
  return { id, name, description };
};

exports.deleteItem = async (id) => {
  const result = await query('DELETE FROM items WHERE id = ?', [id]);
  if (result.affectedRows === 0) {
    return null;
  }
  return { id };
};
