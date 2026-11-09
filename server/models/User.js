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

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
  },
  college: {
    type: String,
    default: '',
  },
  department: {
    type: String,
    default: '',
  },
  graduationYear: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
  },
  skills: [{
    type: String,
  }],
  resumeUrl: {
    type: String,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  appliedInternships: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
  }],
  savedInternships: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
