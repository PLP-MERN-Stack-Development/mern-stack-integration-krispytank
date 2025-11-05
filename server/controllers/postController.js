const mongoose = require('mongoose');
const Post = require('../models/Post');

// get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// get post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email')
      .populate('category', 'name');

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// create post
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, tags, excerpt, featuredImage } = req.body;

    const post = await Post.create({
      title,
      content,
      author: req.user.id, // Use authenticated user ID
      category,
      tags,
      excerpt,
      featuredImage,
    });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create post', error: error.message });
  }
};

// update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update post', error: error.message });
  }
};

// delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete post', error: error.message });
  }
};
