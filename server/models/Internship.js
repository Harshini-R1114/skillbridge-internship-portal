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

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Remote', 'Hybrid', 'On-site'],
    default: 'Remote',
  },
  category: {
    type: String,
    required: true,
    enum: ['Software Engineering', 'AI & Machine Learning', 'Data Science', 'UI/UX Design', 'Cloud & DevOps', 'Cybersecurity', 'Product Management', 'Digital Marketing'],
  },
  stipend: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  openings: {
    type: Number,
    default: 3,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [{
    type: String,
  }],
  perks: [{
    type: String,
  }],
  skillsRequired: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['Active', 'Closed', 'Draft'],
    default: 'Active',
  },
  applicantsCount: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Internship || mongoose.model('Internship', internshipSchema);
