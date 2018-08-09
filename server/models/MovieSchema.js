// Require our DATABASE
// const mongoose = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// Define our Model (Blueprint)
const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Movie must have a title"],
    minlength: [3, "Name must be at least three characters"]
  },
  reviews: [{
    type: ObjectId,
    ref: 'Review'
  }]
}, {
  timestamps: true
});

// Export our MODEL
mongoose.model('Movie', MovieSchema);