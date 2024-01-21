const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  },
  attraction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'attraction'
  },
  estimation: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Rating', RatingSchema);