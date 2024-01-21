const mongoose = require('mongoose');

const AttractionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  country: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model('Attraction', AttractionSchema);