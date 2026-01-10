// const router = require("express").Router();
// const auth = require("../middleware/auth.middleware");
// const role = require("../middleware/role.middleware");
// const ctrl = require("../controllers/course.controller");

// router.post("/", auth, role("Admin"), ctrl.create);
// router.get("/", auth, ctrl.list);

// module.exports = router;




// const router = require("express").Router();
// const auth = require("../middleware/auth.middleware");
// const role = require("../middleware/role.middleware");
// const ctrl = require("../controllers/course.controller");

// router.post("/", auth, role("admin"), ctrl.createCourse);
// router.get("/", auth, ctrl.getCourses);
// router.get("/:id", auth, ctrl.getCourseById);
// router.put("/:id", auth, role("admin"), ctrl.updateCourse);
// router.delete("/:id", auth, role("admin"), ctrl.deleteCourse);

// module.exports = router;



// const router = require("express").Router();
// const auth = require("../middleware/auth.middleware");
// const role = require("../middleware/role.middleware");
// const ctrl = require("../controllers/course.controller");

// // Admin only
// router.post("/", auth, role("admin"), ctrl.createCourse);

// // Any authenticated user
// router.get("/", auth, ctrl.getCourses);
// router.get("/:id", auth, ctrl.getCourseById);

// module.exports = router;



// src/routes/course.routes.js
const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourses,
  getMyCourses,
  assignTeacher,
} = require("../controllers/course.controller");

const auth = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

// Admin only
router.post("/", auth, authorize("admin"), createCourse);
router.get("/", auth, authorize("admin"), getCourses);
router.put(
  "/:id/assign-teacher",
  authMiddleware,
  roleMiddleware("admin"),
  assignTeacher
);


// Teacher only
router.get(
  "/my",
  authMiddleware,
  roleMiddleware("teacher"),
  getMyCourses
);


module.exports = router;


