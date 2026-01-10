const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourses,
  getMyCourses,
  assignTeacher,
} = require("../controllers/course.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// Admin
router.post("/", authMiddleware, roleMiddleware("admin"), createCourse);
router.get("/", authMiddleware, roleMiddleware("admin"), getCourses);

// Teacher
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("teacher"),
  getMyCourses
);

// Admin assign teacher
router.put(
  "/:id/assign-teacher",
  authMiddleware,
  roleMiddleware("admin"),
  assignTeacher
);

module.exports = router;
