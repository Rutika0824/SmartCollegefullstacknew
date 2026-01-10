// const Attendance = require("../models/attendance.model");

// exports.mark = async (req, res, next) => {
//   try {
//     const attendance = await Attendance.create({
//       ...req.body,
//       markedBy: req.user.id
//     });

//     res.status(201).json(attendance);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.list = async (req, res, next) => {
//   try {
//     const records = await Attendance.find(req.query)
//       .populate("studentId", "name email")
//       .populate("markedBy", "name role");

//     res.json(records);
//   } catch (err) {
//     next(err);
//   }
// };



// src/controllers/attendance.controller.js
const Attendance = require("../models/attendance.model");
const Course = require("../models/course.model");

// ✅ Teacher marks attendance
exports.markAttendance = async (req, res) => {
  try {
    const { courseId, date, records } = req.body;

    // Verify teacher owns this course
    const course = await Course.findOne({
      _id: courseId,
      teacherId: req.user.id,
    });

    if (!course) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const attendanceData = records.map((r) => ({
      studentId: r.studentId,
      courseId,
      teacherId: req.user.id,
      date,
      status: r.status,
    }));

    await Attendance.insertMany(attendanceData);

    res.status(201).json({ message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ View attendance
exports.getAttendance = async (req, res) => {
  try {
    const { studentId, courseId } = req.query;

    const filter = {};
    if (studentId) filter.studentId = studentId;
    if (courseId) filter.courseId = courseId;

    const attendance = await Attendance.find(filter)
      .populate("studentId", "name rollNo")
      .populate("courseId", "name")
      .populate("teacherId", "name");

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
