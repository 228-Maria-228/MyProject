const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  },
  description: {
    type: String,
    required: true
  },
  estimation: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Post', PostSchema);