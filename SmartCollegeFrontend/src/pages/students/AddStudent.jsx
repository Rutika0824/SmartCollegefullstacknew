// src/pages/students/AddStudent.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import axiosInstance from '../../api/axios';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '', // 👈 Changed from "enrollmentNumber" to match backend
    courseId: '',
    departmentId: '', // 👈 Added: required by backend
  });
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, deptRes] = await Promise.all([
          axiosInstance.get('/courses'),
          axiosInstance.get('/departments'),
        ]);
        setCourses(courseRes.data);
        setDepartments(deptRes.data);

        if (courseRes.data.length > 0) {
          setFormData((prev) => ({ ...prev, courseId: courseRes.data[0]._id }));
        }
        if (deptRes.data.length > 0) {
          setFormData((prev) => ({ ...prev, departmentId: deptRes.data[0]._id }));
        }
      } catch (err) {
        setError('Could not load courses or departments');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.rollNo.trim() || !formData.courseId || !formData.departmentId) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await axiosInstance.post('/students', formData); // sends departmentId + rollNo
      navigate('/students');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="mt-4">
            <Card.Body>
              <h2>Add New Student</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Sandesh Patil"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Roll Number *</Form.Label>
                  <Form.Control
                    type="text"
                    name="rollNo" // 👈 Matches backend field
                    value={formData.rollNo}
                    onChange={handleChange}
                    placeholder="e.g., EN2026001"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Course *</Form.Label>
                  <Form.Select
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleChange}
                    required
                  >
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Department *</Form.Label>
                  <Form.Select
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleChange}
                    required
                  >
                    {departments.map((dept) => (
                      <option key={dept._id} value={dept._id}>
                        {dept.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Add Student'}
                </Button>
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => navigate('/students')}
                >
                  Cancel
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStudent;