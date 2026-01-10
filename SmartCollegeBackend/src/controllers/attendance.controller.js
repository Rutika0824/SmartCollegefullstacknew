const Attendance = require("../models/attendance.model");
const Course = require("../models/course.model");

// ============================
// MARK ATTENDANCE (Teacher)
// ============================
exports.markAttendance = async (req, res) => {
  try {
    const { courseId, date, records } = req.body;

    if (!courseId || !date || !records?.length) {
      return res.status(400).json({ message: "Invalid data" });
    }

    // Verify teacher owns this course
    const course = await Course.findOne({
      _id: courseId,
      teacherId: req.user.id,
    });

    if (!course) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // Prevent duplicate attendance
    const alreadyMarked = await Attendance.findOne({ courseId, date });
    if (alreadyMarked) {
      return res
        .status(400)
        .json({ message: "Attendance already marked for this date" });
    }

    const attendanceDocs = records.map((r) => ({
      studentId: r.studentId,
      courseId,
      markedBy: req.user.id,
      date,
      status: r.status,
    }));

    await Attendance.insertMany(attendanceDocs);

    res.status(201).json({
      message: "Attendance marked successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ============================
// VIEW ATTENDANCE
// ============================
exports.getAttendance = async (req, res) => {
  try {
    const { date, courseId } = req.query;

    const filter = {};
    if (date) filter.date = date;
    if (courseId) filter.courseId = courseId;

    const records = await Attendance.find(filter)
      .populate("studentId", "name rollNo")
      .populate("courseId", "name")
      .populate("markedBy", "name role")
      .sort({ date: -1 });

    res.json({
      success: true,
      data: records,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getMyAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({
      studentId: req.user.id,
    }).populate("courseId", "name");

    res.json({
      success: true,
      data: records,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

