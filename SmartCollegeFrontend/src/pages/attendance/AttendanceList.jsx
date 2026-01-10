// // src/pages/attendance/AttendanceList.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Alert,
//   Button,
//   Card,
//   Col,
//   Container,
//   Form,
//   Row,
//   Table,
// } from 'react-bootstrap';
// import axiosInstance from '../../api/axios';
// import { useNavigate } from 'react-router-dom';

// const AttendanceList = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [studentsWithAttendance, setStudentsWithAttendance] = useState([]); // { student, attendanceRecords[] }
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();

//   // Fetch courses for dropdown
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axiosInstance.get('/courses');
//         setCourses(res.data);
//         if (res.data.length > 0) {
//           setSelectedCourse(res.data[0]._id);
//         }
//       } catch (err) {
//         setError('Failed to load courses');
//       }
//     };
//     fetchCourses();
//   }, []);

//   // Fetch attendance data when course changes
//   useEffect(() => {
//     if (!selectedCourse) return;
//     fetchAttendance(selectedCourse);
//   }, [selectedCourse]);

//   const fetchAttendance = async (courseId) => {
//     setLoading(true);
//     setError('');
//     try {
//       const res = await axiosInstance.get(`/attendance?courseId=${courseId}`);
//       setStudentsWithAttendance(res.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load attendance data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTodayStatus = (attendanceRecords) => {
//     const today = new Date().toISOString().split('T')[0]; // "2026-01-09"
//     const todayRec = attendanceRecords.find((rec) => rec.date === today);
//     return todayRec ? todayRec.status : null;
//   };

//   const handleMarkClick = (studentId) => {
//     navigate(`/attendance/mark?studentId=${studentId}&courseId=${selectedCourse}`);
//   };

//   return (
//     <Container fluid>
//       <Row className="mb-4">
//         <Col>
//           <h2>Attendance Records</h2>
//         </Col>
//       </Row>

//       {error && <Alert variant="danger">{error}</Alert>}

//       <Card>
//         <Card.Body>
//           <Form.Group className="mb-4">
//             <Form.Label>Select Course</Form.Label>
//             <Form.Select
//               value={selectedCourse}
//               onChange={(e) => setSelectedCourse(e.target.value)}
//             >
//               {courses.map((course) => (
//                 <option key={course._id} value={course._id}>
//                   {course.name} ({course.code})
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>

//           {loading ? (
//             <div className="text-center">Loading...</div>
//           ) : studentsWithAttendance.length === 0 ? (
//             <p>No students enrolled in this course.</p>
//           ) : (
//             <>
//               <Table striped bordered hover responsive>
//                 <thead>
//                   <tr>
//                     <th>Student Name</th>
//                     <th>Enrollment No</th>
//                     <th>Email</th>
//                     <th>Today's Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {studentsWithAttendance.map((item) => {
//                     const student = item.student;
//                     const todayStatus = getTodayStatus(item.attendanceRecords);
//                     return (
//                       <tr key={student._id}>
//                         <td>{student.name}</td>
//                         <td>{student.enrollmentNumber || student.rollNo}</td>
//                         <td>{student.email}</td>
//                         <td>
//                           {todayStatus ? (
//                             <span className={`badge bg-${todayStatus === 'Present' ? 'success' : 'danger'}`}>
//                               {todayStatus}
//                             </span>
//                           ) : (
//                             <span className="text-muted">Not marked</span>
//                           )}
//                         </td>
//                         <td>
//                           <Button
//                             variant="outline-primary"
//                             size="sm"
//                             onClick={() => handleMarkClick(student._id)}
//                           >
//                             Mark Attendance
//                           </Button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </Table>
//             </>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default AttendanceList;










import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AttendanceList() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    api.get("/attendance").then((res) => setAttendance(res.data));
  }, []);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">Attendance Records</h5>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Student</th>
                <th>Course</th>
                <th>Teacher</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a) => (
                <tr key={a._id}>
                  <td>{new Date(a.date).toLocaleDateString()}</td>
                  <td>{a.studentId?.name}</td>
                  <td>{a.courseId?.name}</td>
                  <td>{a.teacherId?.name}</td>
                  <td>
                    <span
                      className={`badge ${
                        a.status === "Present"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}

              {attendance.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
