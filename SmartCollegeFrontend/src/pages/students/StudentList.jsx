// // src/pages/students/StudentList.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Alert,
//   Button,
//   Card,
//   Col,
//   Container,
//   Form,
//   Modal,
//   Row,
//   Table,
// } from 'react-bootstrap';
// import axiosInstance from '../../api/axios';

// const StudentList = () => {
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     rollNo: '', // 👈 Changed from enrollmentNumber
//     courseId: '',
//     departmentId: '', // 👈 Added for consistency
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [filterCourse, setFilterCourse] = useState('');

//   // Fetch students (optionally filtered)
//   const fetchStudents = async (courseId = '') => {
//     try {
//       const res = await axiosInstance.get(`/students${courseId ? `?courseId=${courseId}` : ''}`);
//       setStudents(res.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load students');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch courses for dropdown & filtering
//   const fetchCourses = async () => {
//     try {
//       const res = await axiosInstance.get('/courses');
//       setCourses(res.data);
//       if (res.data.length > 0 && !formData.courseId) {
//         setFormData((prev) => ({ ...prev, courseId: res.data[0]._id }));
//       }
//     } catch (err) {
//       console.error(err);
//       // Non-fatal
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//     fetchStudents(filterCourse);
//   }, [filterCourse]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     if (!formData.name.trim() || !formData.email.trim() || !formData.rollNo.trim() || !formData.courseId || !formData.departmentId) {
//       setError('All fields are required');
//       return;
//     }

//     setSubmitting(true);
//     setError('');
//     try {
//       await axiosInstance.post('/students', formData);
//       setFormData({
//         name: '',
//         email: '',
//         rollNo: '',
//         courseId: courses.length ? courses[0]._id : '',
//         departmentId: courses.length ? courses[0].departmentId : '',
//       });
//       setShowModal(false);
//       fetchStudents(filterCourse);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || 'Failed to create student');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getCourseName = (id) => {
//     if (!id) return '—';
//     const course = courses.find((c) => c._id === id);
//     return course ? course.name : '—';
//   };

//   return (
//     <Container fluid>
//       <Row className="mb-4">
//         <Col md={6}>
//           <h2>Students</h2>
//         </Col>
//         <Col md={6} className="d-flex justify-content-md-end">
//           <Button variant="primary" onClick={() => setShowModal(true)}>
//             Add Student
//           </Button>
//         </Col>
//       </Row>

//       {/* Course Filter */}
//       <Row className="mb-4">
//         <Col md={4}>
//           <Form.Group>
//             <Form.Label>Filter by Course</Form.Label>
//             <Form.Select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}>
//               <option value="">All Courses</option>
//               {courses.map((course) => (
//                 <option key={course._id} value={course._id}>
//                   {course.name}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//         </Col>
//       </Row>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {loading && students.length === 0 ? (
//         <div className="text-center">Loading...</div>
//       ) : (
//         <Card>
//           <Card.Body>
//             <Table striped bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Roll No</th> {/* 👈 Updated header */}
//                   <th>Course</th>
//                   <th>Created At</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="text-center">
//                       No students found
//                     </td>
//                   </tr>
//                 ) : (
//                   students.map((student) => (
//                     <tr key={student._id}>
//                       <td>{student.name}</td>
//                       <td>{student.email || '—'}</td>
//                       <td>{student.rollNo || '—'}</td>
//                       <td>{getCourseName(student.courseId)}</td>
//                       <td>{new Date(student.createdAt).toLocaleDateString()}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </Table>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Add Student Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Student</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleCreate}>
//             <Form.Group className="mb-3">
//               <Form.Label>Full Name *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 placeholder="e.g., Sandesh Patil"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Email *</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="student@example.com"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Roll Number *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="rollNo"
//                 value={formData.rollNo}
//                 onChange={handleInputChange}
//                 placeholder="e.g., EN2026001"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Course *</Form.Label>
//               <Form.Select
//                 name="courseId"
//                 value={formData.courseId}
//                 onChange={handleInputChange}
//                 required
//               >
//                 {courses.map((course) => (
//                   <option key={course._id} value={course._id}>
//                     {course.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Department *</Form.Label>
//               <Form.Select
//                 name="departmentId"
//                 value={formData.departmentId}
//                 onChange={handleInputChange}
//                 required
//               >
//                 {courses.map((course) => (
//                   <option key={course._id} value={course.departmentId}>
//                     {course.departmentName || course.departmentId}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             <Button variant="primary" type="submit" disabled={submitting}>
//               {submitting ? 'Creating...' : 'Add Student'}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default StudentList;









import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/students")
      .then((res) => setStudents(res.data))
      .catch(() => setError("Failed to load students"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  const getDepartmentName = (id) => {
    if (!id) return '—';
    const dept = departments.find((d) => d._id === id);
    return dept ? dept.name : '—';
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h5 className="mb-3">Students</h5>

        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Department</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No students found
                  </td>
                </tr>
              )}

              {students.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.rollNo}</td>
                  <td>{s.departmentId?.name || "-"}</td>
                  <td>{s.courseId?.name || "-"}</td>
                  <td>
                    <span
                      className={`badge ${
                        s.status === "Active"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
