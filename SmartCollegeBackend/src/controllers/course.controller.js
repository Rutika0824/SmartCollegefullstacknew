// src/controllers/course.controller.js
const Course = require("../models/course.model");

// ✅ Admin: Create course with teacher assignment
exports.createCourse = async (req, res) => {
  try {
    const { name, code, departmentId, teacherId, duration } = req.body;

    if (!name || !code || !departmentId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const course = await Course.create({
      name,
      code,
      departmentId,
      teacherId,
      duration,
    });

    res.status(201).json({
      message: "Course created successfully",
      data: course,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Admin: Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("departmentId", "name")
      .populate("teacherId", "name email role");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Teacher: Get only assigned courses
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacherId: req.user.id }).populate(
      "departmentId",
      "name"
    );

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignTeacher = async (req, res) => {
  const { teacherId } = req.body;

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { teacherId },
    { new: true }
  );

  res.json({
    success: true,
    data: course,
  });
};

exports.getMyCourses = async (req, res) => {
  const courses = await Course.find({
    teacherId: req.user.id,
    status: "Active",
  });

  res.json({
    success: true,
    data: courses,
  });
};
