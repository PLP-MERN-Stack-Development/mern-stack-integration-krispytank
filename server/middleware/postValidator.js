// middlewares/postValidator.js

const { body, validationResult } = require('express-validator');

// Validation rules for creating a new post
exports.validateCreatePost = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),

  body('content')
    .notEmpty().withMessage('Content is required'),

  body('category')
    .notEmpty().withMessage('Category ID is required')
    .isMongoId().withMessage('Category must be a valid MongoDB ObjectId'),

  body('excerpt')
    .optional()
    .isLength({ max: 200 }).withMessage('Excerpt cannot be more than 200 characters'),

  // Middleware to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }
    next();
  },
];

// Validation rules for updating a post
exports.validateUpdatePost = [
  body('title')
    .optional()
    .isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),

  body('content')
    .optional()
    .notEmpty().withMessage('Content cannot be empty'),

  body('excerpt')
    .optional()
    .isLength({ max: 200 }).withMessage('Excerpt cannot be more than 200 characters'),

  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array of strings'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.param,
          message: err.msg,
        })),
      });
    }
    next();
  },
];
