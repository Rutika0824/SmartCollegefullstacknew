// const router = require("express").Router();
// const auth = require("../middleware/auth.middleware");
// const role = require("../middleware/role.middleware");
// const ctrl = require("../controllers/attendance.controller");

// router.post("/", auth, role("teacher"), ctrl.mark);
// router.get("/", auth, ctrl.list);

// module.exports = router;




const express = require("express");
const router = express.Router();

const {
  markAttendance,
  getAttendance,
} = require("../controllers/attendance.controller");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

router.post(
  "/",
  authMiddleware,
  roleMiddleware("teacher"),
  markAttendance
);

router.get(
  "/",
  authMiddleware,
  getAttendance
);

module.exports = router;
