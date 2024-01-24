// src/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);
router.post('/', validationMiddleware.validateCreateItem, itemController.createItem);
router.put('/:id', validationMiddleware.validateCreateItem, itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
