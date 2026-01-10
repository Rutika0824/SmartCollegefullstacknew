// const router = require("express").Router();
// const auth = require("../middleware/auth.middleware");
// const role = require("../middleware/role.middleware");
// const ctrl = require("../controllers/attendance.controller");

// router.post("/", auth, role("teacher"), ctrl.mark);
// router.get("/", auth, ctrl.list);

// module.exports = router;




// src/routes/attendance.routes.js
const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendance,
} = require("../controllers/attendance.controller");

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

// Teacher only
router.post("/", auth, authorize("teacher"), markAttendance);

// Admin / Student
router.get("/", auth, getAttendance);

module.exports = router;
