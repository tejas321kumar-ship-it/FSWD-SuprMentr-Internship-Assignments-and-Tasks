const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 180
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    content: {
      type: String,
      required: true,
      minlength: 10
    },
    excerpt: {
      type: String,
      default: '',
      maxlength: 300
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft'
    },
    publishedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

postSchema.pre('save', function (next) {
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);
