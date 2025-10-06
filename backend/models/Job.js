const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  minSalary: { type: Number, required: true },
  maxSalary: { type: Number, required: true },
  experienceRange: { type: String, required: true },
  companyImage: { type: String },
  description: {
    summary: { type: String, required: true },
    responsibilities: [{ type: String, required: true }]
  },
  status: { type: String, required: true }
});

module.exports = mongoose.model('Job', jobSchema);
