const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendance,
  getMyAttendance,
} = require("../controllers/attendance.controller");

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const authMiddleware = require("../middleware/auth.middleware");

// Teacher → Mark attendance
router.post("/", auth, role("teacher"), markAttendance);

// Admin / Teacher / Student → View attendance
router.get("/", auth, getAttendance);

router.get(
  "/my",
  authMiddleware,
  roleMiddleware("student"),
  getMyAttendance
);


module.exports = router;
