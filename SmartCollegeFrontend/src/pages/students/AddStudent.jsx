// // src/pages/students/AddStudent.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
// import axiosInstance from '../../api/axios';

// const AddStudent = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     rollNo: '', // 👈 Changed from "enrollmentNumber" to match backend
//     courseId: '',
//     departmentId: '', // 👈 Added: required by backend
//   });
//   const [courses, setCourses] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [courseRes, deptRes] = await Promise.all([
//           axiosInstance.get('/courses'),
//           axiosInstance.get('/departments'),
//         ]);
//         setCourses(courseRes.data);
//         setDepartments(deptRes.data);

//         if (courseRes.data.length > 0) {
//           setFormData((prev) => ({ ...prev, courseId: courseRes.data[0]._id }));
//         }
//         if (deptRes.data.length > 0) {
//           setFormData((prev) => ({ ...prev, departmentId: deptRes.data[0]._id }));
//         }
//       } catch (err) {
//         setError('Could not load courses or departments');
//       }
//     };
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name.trim() || !formData.email.trim() || !formData.rollNo.trim() || !formData.courseId || !formData.departmentId) {
//       setError('All fields are required');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     try {
//       await axiosInstance.post('/students', formData); // sends departmentId + rollNo
//       navigate('/students');
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || 'Failed to create student');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container fluid>
//       <Row>
//         <Col md={{ span: 6, offset: 3 }}>
//           <Card className="mt-4">
//             <Card.Body>
//               <h2>Add New Student</h2>
//               {error && <Alert variant="danger">{error}</Alert>}
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Full Name *</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="e.g., Sandesh Patil"
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Email *</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="student@example.com"
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Roll Number *</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="rollNo" // 👈 Matches backend field
//                     value={formData.rollNo}
//                     onChange={handleChange}
//                     placeholder="e.g., EN2026001"
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Course *</Form.Label>
//                   <Form.Select
//                     name="courseId"
//                     value={formData.courseId}
//                     onChange={handleChange}
//                     required
//                   >
//                     {courses.map((course) => (
//                       <option key={course._id} value={course._id}>
//                         {course.name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Department *</Form.Label>
//                   <Form.Select
//                     name="departmentId"
//                     value={formData.departmentId}
//                     onChange={handleChange}
//                     required
//                   >
//                     {departments.map((dept) => (
//                       <option key={dept._id} value={dept._id}>
//                         {dept.name}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Button variant="primary" type="submit" disabled={loading}>
//                   {loading ? 'Creating...' : 'Add Student'}
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   className="ms-2"
//                   onClick={() => navigate('/students')}
//                 >
//                   Cancel
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AddStudent;








import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AddStudent() {
  const [name, setName] = useState("");

  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [courseId, setCourseId] = useState("");

  const [rollNo, setRollNo] = useState("");

  useEffect(() => {
    api.get("/departments").then((res) => setDepartments(res.data));
    api.get("/courses").then((res) => setCourses(res.data));
  }, []);

  // 🔹 UPDATED ROLL NUMBER LOGIC (1,2,3...)
  useEffect(() => {
    const generateRollNo = async () => {
      const res = await api.get("/students");
      setRollNo(res.data.length + 1);
    };
    generateRollNo();
  }, []);

  const handleDepartmentChange = (deptId) => {
    setDepartmentId(deptId);
    setCourseId("");

    const relatedCourses = courses.filter(
      (c) => c.departmentId === deptId || c.departmentId?._id === deptId
    );
    setFilteredCourses(relatedCourses);
  };

  // 🔹 ONLY COURSE SELECTION (no roll logic here now)
  const handleCourseChange = (courseId) => {
    setCourseId(courseId);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await api.post("/students", {
      name,
      rollNo,
      departmentId,
      courseId,
      status: "Active",
    });

    alert("Student added");
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5>Add Student</h5>

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label>Student Name</label>
            <input
              className="form-control"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Department</label>
            <select
              className="form-select"
              required
              onChange={(e) => handleDepartmentChange(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Course</label>
            <select
              className="form-select"
              required
              disabled={!departmentId}
              onChange={(e) => handleCourseChange(e.target.value)}
            >
              <option value="">Select Course</option>
              {filteredCourses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Roll Number</label>
            <input className="form-control" value={rollNo} disabled />
          </div>

          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
}
