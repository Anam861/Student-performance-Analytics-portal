const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    studentId: {
      type: String,
      required: [true, 'Please add a registration ID'],
      unique: true
    },
    class: {
      type: String,
      required: [true, 'Please specify the class/grade level']
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    guardianName: {
      type: String,
      required: [true, "Please add a guardian's name"]
    },
    guardianPhone: {
      type: String,
      required: [true, "Please add a guardian's phone number"]
    }
  },
  {
    timestamps: true
  }
);

// Add index on class for fast filtering
studentSchema.index({ class: 1 });

module.exports = mongoose.model('Student', studentSchema);
