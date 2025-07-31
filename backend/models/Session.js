import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  json_file_url: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  published_at: {
    type: Date
  }
});

// Update the updated_at field before saving
sessionSchema.pre('save', function(next) {
  this.updated_at = new Date();
  if (this.status === 'published' && !this.published_at) {
    this.published_at = new Date();
  }
  next();
});

export default mongoose.model('Session', sessionSchema);