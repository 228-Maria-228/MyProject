const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  },
  estimation: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);