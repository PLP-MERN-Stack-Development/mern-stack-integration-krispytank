const Category = require('../models/Category');

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// Create a new category
exports.postCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await Category.create({
      name,
      description,
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create category', error: error.message });
  }
};
