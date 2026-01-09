// const mongoose = require("mongoose");

// module.exports = mongoose.model(
//   "Student",
//   new mongoose.Schema({
//     name: String,
//     rollNumber: String,
//     courseId: mongoose.Schema.Types.ObjectId,
//     departmentId: mongoose.Schema.Types.ObjectId,
//     parentId: mongoose.Schema.Types.ObjectId,
//     status: String
//   })
// );



// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true
//     },
//     rollNo: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     department: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Department",
//       required: true
//     },
//     course: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//       required: true
//     },
//     year: {
//       type: Number,
//       required: true
//     }
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Student", studentSchema);



const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);

