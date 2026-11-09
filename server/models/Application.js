let mongoose;
try {
  mongoose = require('mongoose');
} catch (e) {
  mongoose = {
    Schema: function() { return {}; },
    models: {},
    model: function(name, schema) { return function() {}; }
  };
  mongoose.Schema.Types = { ObjectId: String };
}

const applicationSchema = new mongoose.Schema({
  internship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
    required: true,
  },
  internshipTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  studentCollege: {
    type: String,
    default: '',
  },
  resumeUrl: {
    type: String,
    default: '',
  },
  coverNote: {
    type: String,
    default: '',
  },
  portfolioUrl: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Shortlisted', 'Interview', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
  timeline: [
    {
      status: String,
      date: { type: Date, default: Date.now },
      note: String,
    }
  ],
  feedback: {
    type: String,
    default: '',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Application || mongoose.model('Application', applicationSchema);
