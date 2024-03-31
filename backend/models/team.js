const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  users: [String], // Array of user IDs
  // Other fields as needed
});

module.exports = mongoose.model('Team', teamSchema);