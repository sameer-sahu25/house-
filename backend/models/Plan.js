const mongoose = require('mongoose');

const actionStepSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  badge: { type: String, default: '' },
  category: { type: String, required: true }, // 'Legal', 'Financial', or 'Housing'
  urgent: { type: Boolean, default: false },
  inactive: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
}, { _id: false });

const planSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  actionSteps: [actionStepSchema],
  documentsNeeded: [String],
  rightsSummary: { type: String, required: true },
  urgencyLevel: { type: String, required: true }, // 'High', 'Medium', or 'Low'
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 7, // Automatically expire after 7 days
  },
});

module.exports = mongoose.model('Plan', planSchema);
