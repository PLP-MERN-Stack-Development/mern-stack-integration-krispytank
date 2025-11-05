const express = require('express');
const {
   getCategories,
   postCategory
} = require('../controllers/categoryController');

const router = express.Router();

// get all categories
router.get('/', getCategories);

// create category
router.post('/', postCategory);

module.exports = router;
 