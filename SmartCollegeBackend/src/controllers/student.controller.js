const Student = require("../models/student.model");

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
    const filter = {};

    // support: /api/students?courseId=
    if (req.query.courseId) {
      filter.courseId = req.query.courseId;
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
