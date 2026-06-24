const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['Present', 'Absent', 'Late'],
      default: 'Present'
    },
    remarks: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Compound index on student ID and date to quickly check daily attendance
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
