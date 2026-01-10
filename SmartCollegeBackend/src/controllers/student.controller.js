const Student = require("../models/student.model");
const Course = require("../models/course.model");

exports.createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

exports.getStudents = async (req, res, next) => {
  try {
    const { courseId } = req.query;
    const filter = {};

    // If courseId is passed
    if (courseId) {
      // 🔒 TEACHER ACCESS CONTROL
      if (req.user.role === "teacher") {
        const course = await Course.findOne({
          _id: courseId,
          teacherId: req.user.id,
        });

        if (!course) {
          return res.status(403).json({
            message: "You are not allowed to access this course",
          });
        }
      }

      filter.courseId = courseId;
    }

    const students = await Student.find(filter)
      .populate("courseId", "name duration status")
      .populate("departmentId", "name code status")
      .populate("parentId", "name email role");

    res.json(students);
  } catch (err) {
    next(err);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("courseId", "name duration status")
      .populate("departmentId", "name code status")
      .populate("parentId", "name email role");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    next(err);
  }
};


// student.controller.js
exports.getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.user.id })
      .populate("departmentId", "name code")
      .populate("courseId", "name code");

    if (!student) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    res.json({
      success: true,
      data: student,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
