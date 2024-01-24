// src/controllers/itemController.js
const ItemService = require('../services/itemService');

exports.getAllItems = async (req, res) => {
  try {
    const items = await ItemService.getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await ItemService.getItemById(id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createItem = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newItem = await ItemService.createItem(name, description);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedItem = await ItemService.updateItem(id, name, description);
    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await ItemService.deleteItem(id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(deletedItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
