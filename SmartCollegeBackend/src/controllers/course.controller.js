// const Course = require("../models/Course");

// exports.create = async (req, res) => {
//   res.status(201).json(await Course.create(req.body));
// };

// exports.list = async (req, res) => {
//   const filter = req.query.departmentId
//     ? { departmentId: req.query.departmentId }
//     : {};
//   res.json(await Course.find(filter));
// };








// const Course = require("../models/course.model");

// exports.createCourse = async (req, res, next) => {
//   try {
//     const course = await Course.create(req.body);
//     res.status(201).json(course);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getCourses = async (req, res, next) => {
//   try {
//     const courses = await Course.find()
//       .populate("department", "name");
//     res.json(courses);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getCourseById = async (req, res, next) => {
//   try {
//     const course = await Course.findById(req.params.id)
//       .populate("department", "name");

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.json(course);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.updateCourse = async (req, res, next) => {
//   try {
//     const course = await Course.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.json(course);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.deleteCourse = async (req, res, next) => {
//   try {
//     const course = await Course.findByIdAndDelete(req.params.id);

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.json({ message: "Course deleted successfully" });
//   } catch (err) {
//     next(err);
//   }
// };






// const Course = require("../models/course.model");

// exports.createCourse = async (req, res, next) => {
//   try {
//     const course = await Course.create(req.body);
//     res.status(201).json(course);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getCourses = async (req, res, next) => {
//   try {
//     const filter = {};

//     // support: /api/courses?departmentId=
//     if (req.query.departmentId) {
//       filter.departmentId = req.query.departmentId;
//     }

//     const courses = await Course.find(filter)
//       .populate("departmentId", "name code status");

//     res.json(courses);
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getCourseById = async (req, res, next) => {
//   try {
//     const course = await Course.findById(req.params.id)
//       .populate("departmentId", "name code status");

//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     res.json(course);
//   } catch (err) {
//     next(err);
//   }
// };




// src/controllers/course.controller.js
// const Course = require("../models/course.model")

// // ✅ Admin: Create course with teacher assignment
// exports.createCourse = async (req, res) => {
//   try {
//     const { name, departmentId, teacherId, duration, status } = req.body;

//     if (!teacherId) {
//       return res.status(400).json({ message: "Teacher is required" });
//     }

//     const course = await Course.create({
//       name,
//       departmentId,
//       teacherId,
//       duration,
//       status,
//     });

//     res.status(201).json(course);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Admin: Get all courses
// exports.getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find()
//       .populate("departmentId", "name")
//       .populate("teacherId", "name email role");

//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Teacher: Get only assigned courses
// exports.getMyCourses = async (req, res) => {
//   try {
//     const courses = await Course.find({ teacherId: req.user.id })
//       .populate("departmentId", "name");

//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// src/controllers/course.controller.js
const Course = require("../models/course.model");

// Utility: Generate course code
const generateCourseCode = (name) => {
  return name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .map(w => w.substring(0, 2))
    .join("")
    .toUpperCase();
};

// Admin: Create course
exports.createCourse = async (req, res) => {
  try {
    const { name, departmentId, teacherId, duration, status } = req.body;

    if (!teacherId) {
      return res.status(400).json({ message: "Teacher is required" });
    }

    const code = generateCourseCode(name);

    const course = await Course.create({
      name,
      code,
      departmentId,
      teacherId,
      duration,
      status,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("departmentId", "name")
      .populate("teacherId", "name email");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Teacher: Get assigned courses
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacherId: req.user.id })
      .populate("departmentId", "name");

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
