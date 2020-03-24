const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  LGA: String,
  stateoforigin: String,
  country: String,
  gender: String,
  dateofbirth: String,
  isAdmitted: Boolean
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
