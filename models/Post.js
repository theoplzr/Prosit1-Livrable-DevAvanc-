const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  // Define your post schema fields here, e.g.:
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    // You might reference a User model here in a real app
    type: String, // Placeholder: store author as a string for now
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post; 