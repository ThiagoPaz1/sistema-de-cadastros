const mongoose = require('mongoose');

const employeSchema = mongoose.Schema({
  name: { type: String, required: true },
  sector: { type: String, required: true },
});

module.exports = mongoose.model('Employees', employeSchema);