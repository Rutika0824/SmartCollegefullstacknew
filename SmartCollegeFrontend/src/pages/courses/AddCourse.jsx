// // src/pages/courses/AddCourse.jsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
// import axiosInstance from '../../api/axios';

// const AddCourse = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     departmentId: '',
//     duration: '8 Semesters',
//     status: 'Active',
//   });
//   const [departments, setDepartments] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Fetch departments for dropdown
//   useEffect(() => {
//     const fetchDepts = async () => {
//       try {
//         const res = await axiosInstance.get('/departments');
//         setDepartments(res.data);
//         if (res.data.length > 0) {
//           setFormData((prev) => ({ ...prev, departmentId: res.data[0]._id }));
//         }
//       } catch (err) {
//         setError('Could not load departments');
//       }
//     };
//     fetchDepts();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name.trim() || !formData.departmentId) {
//       setError('Course name and department are required');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     try {
//       await axiosInstance.post('/courses', formData);
//       navigate('/courses');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to create course');
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
//               <h2>Add New Course</h2>
//               {error && <Alert variant="danger">{error}</Alert>}
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Course Name *</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="e.g., Web Development"
//                     required
//                   />
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

//                 <Form.Group className="mb-3">
//                   <Form.Label>Duration</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="duration"
//                     value={formData.duration}
//                     onChange={handleChange}
//                     placeholder="e.g., 8 Semesters"
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Status</Form.Label>
//                   <Form.Select name="status" value={formData.status} onChange={handleChange}>
//                     <option value="Active">Active</option>
//                     <option value="Inactive">Inactive</option>
//                   </Form.Select>
//                 </Form.Group>

//                 <Button variant="primary" type="submit" disabled={loading}>
//                   {loading ? 'Creating...' : 'Create Course'}
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   className="ms-2"
//                   onClick={() => navigate('/courses')}
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

// export default AddCourse;







import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AddCourse() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [teacherId, setTeacherId] = useState("");

  useEffect(() => {
    api.get("/departments").then((res) => setDepartments(res.data));
    api.get("/users?role=teacher").then((res) => setTeachers(res.data));
  }, []);

  const generateCode = (value, deptCode) => {
    const c = value.substring(0, 2).toUpperCase();
    setCode(`${c}-${deptCode}`);
    setName(value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/courses", {
      name,
      code,
      departmentId,
      teacherId,
      duration: "6 Sem",
    });
    alert("Course created");
  };

  const selectedDept = departments.find((d) => d._id === departmentId);

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5>Add Course</h5>

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label>Department</label>
            <select
              className="form-select"
              required
              onChange={(e) => setDepartmentId(e.target.value)}
            >
              <option value="">Select</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Course Name</label>
            <input
              className="form-control"
              required
              onChange={(e) =>
                generateCode(e.target.value, selectedDept?.code || "")
              }
            />
          </div>

          <div className="mb-3">
            <label>Course Code</label>
            <input className="form-control" value={code} disabled />
          </div>

          <div className="mb-3">
            <label>Assign Teacher</label>
            <select
              className="form-select"
              required
              onChange={(e) => setTeacherId(e.target.value)}
            >
              <option value="">Select</option>
              {teachers.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
}
