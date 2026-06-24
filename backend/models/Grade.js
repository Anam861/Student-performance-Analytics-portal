const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    marksObtained: {
      type: Number,
      required: [true, 'Please add marks obtained'],
      min: [0, 'Marks cannot be negative']
    },
    maxMarks: {
      type: Number,
      required: [true, 'Please add maximum possible marks'],
      default: 100
    },
    examType: {
      type: String,
      required: true,
      enum: ['Quiz', 'Assignment', 'Midterm', 'Final Exam', 'Project']
    },
    semester: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Create compound index for fast queries of a student's grades in a course
gradeSchema.index({ studentId: 1, subjectId: 1 });

module.exports = mongoose.model('Grade', gradeSchema);
