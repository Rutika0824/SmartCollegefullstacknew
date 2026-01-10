// // src/pages/attendance/MarkAttendance.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
// import axiosInstance from '../../api/axios';

// const MarkAttendance = () => {
//   const [student, setStudent] = useState(null);
//   const [course, setCourse] = useState(null);
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Today
//   const [status, setStatus] = useState('Present');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const studentId = searchParams.get('studentId');
//   const courseId = searchParams.get('courseId');

//   useEffect(() => {
//     if (!studentId || !courseId) {
//       setError('Missing student or course ID');
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         // Fetch student
//         const studentRes = await axiosInstance.get(`/students/${studentId}`);
//         setStudent(studentRes.data);

//         // Fetch course
//         const courseRes = await axiosInstance.get(`/courses/${courseId}`);
//         setCourse(courseRes.data);
//       } catch (err) {
//         setError('Failed to load student or course data');
//       }
//     };

//     fetchData();
//   }, [studentId, courseId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!studentId || !courseId) return;

//     setLoading(true);
//     setError('');
//     try {
//       await axiosInstance.post('/attendance/mark', {
//         studentId,
//         courseId,
//         date,
//         status,
//       });

//       // Redirect back to list after success
//       navigate(`/attendance`);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || 'Failed to mark attendance');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!student || !course) {
//     return (
//       <Container fluid>
//         <Row className="mt-5">
//           <Col className="text-center">
//             {error ? (
//               <Alert variant="danger">{error}</Alert>
//             ) : (
//               <div>Loading student and course details...</div>
//             )}
//           </Col>
//         </Row>
//       </Container>
//     );
//   }

//   return (
//     <Container fluid>
//       <Row className="mb-4">
//         <Col>
//           <h2>Mark Attendance</h2>
//         </Col>
//       </Row>

//       {error && <Alert variant="danger">{error}</Alert>}

//       <Card>
//         <Card.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Student</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={`${student.name} (${student.enrollmentNumber || student.rollNo})`}
//                 readOnly
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Course</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={`${course.name} (${course.code})`}
//                 readOnly
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Status</Form.Label>
//               <Form.Select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 required
//               >
//                 <option value="Present">Present</option>
//                 <option value="Absent">Absent</option>
//               </Form.Select>
//             </Form.Group>

//             <Button variant="primary" type="submit" disabled={loading}>
//               {loading ? 'Saving...' : 'Mark Attendance'}
//             </Button>
//             <Button
//               variant="secondary"
//               className="ms-2"
//               onClick={() => navigate(-1)} // go back
//             >
//               Cancel
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default MarkAttendance;

// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// export default function AttendanceList() {
//   const [attendance, setAttendance] = useState([]);
//   const [date, setDate] = useState("");

//   useEffect(() => {
//     api
//       .get("/attendance", { params: { date } })
//       .then((res) => setAttendance(res.data.data));
//   }, [date]);

//   return (
//     <div className="card shadow-sm">
//       <div className="card-body">
//         <h5 className="mb-3">Attendance Records</h5>

//         <input
//           type="date"
//           className="form-control mb-3"
//           onChange={(e) => setDate(e.target.value)}
//         />

//         <div className="table-responsive">
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Student</th>
//                 <th>Course</th>
//                 <th>Teacher</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendance.map((a) => (
//                 <tr key={a._id}>
//                   <td>{new Date(a.date).toLocaleDateString()}</td>
//                   <td>{a.studentId?.name || "-"}</td>
//                   <td>{a.courseId?.name || "-"}</td>
//                   <td>{a.teacherId?.name || "-"}</td>
//                   <td>
//                     <span
//                       className={`badge ${
//                         a.status === "Present"
//                           ? "bg-success"
//                           : "bg-danger"
//                       }`}
//                     >
//                       {a.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}

//               {attendance.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center">
//                     No attendance records found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// export default function MarkAttendance() {
//   const [courses, setCourses] = useState([]);
//   const [courseId, setCourseId] = useState("");
//   const [students, setStudents] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [date, setDate] = useState("");

//   useEffect(() => {
//     api.get("/courses/my").then((res) => setCourses(res.data));
//   }, []);

//   const loadStudents = async (id) => {
//     setCourseId(id);
//     const res = await api.get(`/students?courseId=${id}`);
//     setStudents(res.data);

//     const initialRecords = res.data.map((s) => ({
//       studentId: s._id,
//       status: "Present",
//     }));
//     setRecords(initialRecords);
//   };

//   const updateStatus = (studentId, status) => {
//     setRecords((prev) =>
//       prev.map((r) =>
//         r.studentId === studentId ? { ...r, status } : r
//       )
//     );
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     await api.post("/attendance", {
//       courseId,
//       date,
//       records,
//     });

//     alert("Attendance marked successfully");
//     setStudents([]);
//     setRecords([]);
//     setCourseId("");
//     setDate("");
//   };

//   return (
//     <div className="card shadow-sm">
//       <div className="card-body">
//         <h5 className="mb-3">Mark Attendance</h5>

//         <form onSubmit={submitHandler}>
//           <div className="mb-3">
//             <label>Select Course</label>
//             <select
//               className="form-select"
//               required
//               onChange={(e) => loadStudents(e.target.value)}
//             >
//               <option value="">Select</option>
//               {courses.map((c) => (
//                 <option key={c._id} value={c._id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-3">
//             <label>Date</label>
//             <input
//               type="date"
//               className="form-control"
//               required
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>

//           {students.length > 0 && (
//             <>
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Roll No</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((s) => (
//                     <tr key={s._id}>
//                       <td>{s.name}</td>
//                       <td>{s.rollNo}</td>
//                       <td>
//                         <select
//                           className="form-select"
//                           onChange={(e) =>
//                             updateStatus(s._id, e.target.value)
//                           }
//                         >
//                           <option value="Present">Present</option>
//                           <option value="Absent">Absent</option>
//                         </select>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <button className="btn btn-primary mt-3">
//                 Submit Attendance
//               </button>
//             </>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// export default function MarkAttendance() {
//   const [courses, setCourses] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [courseId, setCourseId] = useState("");
//   const [date, setDate] = useState("");

//   useEffect(() => {
//     api.get("/courses/my").then((res) => setCourses(res.data.data));
//   }, []);

//   const loadStudents = async (id) => {
//     setCourseId(id);
//     const res = await api.get(`/students?courseId=${id}`);
//     setStudents(res.data.data);

//     setRecords(
//       res.data.data.map((s) => ({
//         studentId: s._id,
//         status: "Present",
//       }))
//     );
//   };

//   const updateStatus = (id, status) => {
//     setRecords((prev) =>
//       prev.map((r) =>
//         r.studentId === id ? { ...r, status } : r
//       )
//     );
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     await api.post("/attendance", {
//       courseId,
//       date,
//       records,
//     });

//     alert("Attendance marked successfully");
//     setStudents([]);
//     setRecords([]);
//     setCourseId("");
//     setDate("");
//   };

//   return (
//     <div className="card shadow-sm">
//       <div className="card-body">
//         <h5 className="mb-3">Mark Attendance</h5>

//         <form onSubmit={submitHandler}>
//           <select
//             className="form-select mb-3"
//             required
//             onChange={(e) => loadStudents(e.target.value)}
//           >
//             <option value="">Select Course</option>
//             {courses.map((c) => (
//               <option key={c._id} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>

//           <input
//             type="date"
//             className="form-control mb-3"
//             required
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />

//           {students.length > 0 && (
//             <>
//               <table className="table table-bordered">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Roll No</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((s) => (
//                     <tr key={s._id}>
//                       <td>{s.name}</td>
//                       <td>{s.rollNo}</td>
//                       <td>
//                         <select
//                           className="form-select"
//                           onChange={(e) =>
//                             updateStatus(s._id, e.target.value)
//                           }
//                         >
//                           <option value="Present">Present</option>
//                           <option value="Absent">Absent</option>
//                         </select>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <button className="btn btn-primary mt-3">
//                 Submit Attendance
//               </button>
//             </>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function MarkAttendance() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/courses/my")
      .then((res) => {
        setCourses(res.data?.data || []);
      })
      .catch(() => setCourses([]));
  }, []);

  const loadStudents = async (id) => {
    setCourseId(id);
    setLoading(true);

    try {
      const res = await api.get(`/students?courseId=${id}`);
      const list = res.data?.data || [];

      setStudents(list);
      setRecords(
        list.map((s) => ({
          studentId: s._id,
          status: "Present",
        }))
      );
    } catch {
      setStudents([]);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = (studentId, status) => {
    setRecords((prev) =>
      prev.map((r) => (r.studentId === studentId ? { ...r, status } : r))
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await api.post("/attendance", {
      courseId,
      date,
      records,
    });

    alert("Attendance marked successfully");

    setStudents([]);
    setRecords([]);
    setCourseId("");
    setDate("");
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">Mark Attendance</h5>

        <form onSubmit={submitHandler}>
          <select
            className="form-select"
            value={courseId}
            onChange={(e) => loadStudents(e.target.value)}
          >
            <option value="">Select Course</option>

            {courses.length === 0 && (
              <option disabled>No courses assigned</option>
            )}

            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="form-control mb-3"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {loading && <p>Loading students...</p>}

          {students.length > 0 && (
            <>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Roll No</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s._id}>
                      <td>{s.name}</td>
                      <td>{s.rollNo}</td>
                      <td>
                        <select
                          className="form-select"
                          onChange={(e) => updateStatus(s._id, e.target.value)}
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className="btn btn-primary mt-3">
                Submit Attendance
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
