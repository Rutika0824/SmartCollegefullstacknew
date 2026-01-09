// src/pages/attendance/MarkAttendance.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import axiosInstance from '../../api/axios';

const MarkAttendance = () => {
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Today
  const [status, setStatus] = useState('Present');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studentId = searchParams.get('studentId');
  const courseId = searchParams.get('courseId');

  useEffect(() => {
    if (!studentId || !courseId) {
      setError('Missing student or course ID');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch student
        const studentRes = await axiosInstance.get(`/students/${studentId}`);
        setStudent(studentRes.data);

        // Fetch course
        const courseRes = await axiosInstance.get(`/courses/${courseId}`);
        setCourse(courseRes.data);
      } catch (err) {
        setError('Failed to load student or course data');
      }
    };

    fetchData();
  }, [studentId, courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId || !courseId) return;

    setLoading(true);
    setError('');
    try {
      await axiosInstance.post('/attendance/mark', {
        studentId,
        courseId,
        date,
        status,
      });

      // Redirect back to list after success
      navigate(`/attendance`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to mark attendance');
    } finally {
      setLoading(false);
    }
  };

  if (!student || !course) {
    return (
      <Container fluid>
        <Row className="mt-5">
          <Col className="text-center">
            {error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <div>Loading student and course details...</div>
            )}
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>Mark Attendance</h2>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Student</Form.Label>
              <Form.Control
                type="text"
                value={`${student.name} (${student.enrollmentNumber || student.rollNo})`}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Control
                type="text"
                value={`${course.name} (${course.code})`}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Mark Attendance'}
            </Button>
            <Button
              variant="secondary"
              className="ms-2"
              onClick={() => navigate(-1)} // go back
            >
              Cancel
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MarkAttendance;