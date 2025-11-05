const express = require('express');
const {
    getPost,
    getPosts,
    createPost,
    deletePost,
    updatePost
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

const router = express.Router();

const { validateCreatePost, validateUpdatePost } = require('../middleware/postValidator');

// get post
router.get('/:id', getPost);

// get all posts
router.get('/', getPosts);

// create post
router.post('/', protect, validateCreatePost, createPost);

// delete post
router.delete('/:id', protect, deletePost);

// update post
router.put('/:id', protect, validateUpdatePost, updatePost);

module.exports = router;
