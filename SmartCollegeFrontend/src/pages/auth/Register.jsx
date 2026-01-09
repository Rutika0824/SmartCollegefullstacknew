// src/pages/auth/Register.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'teacher', // default role
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return 'Valid email is required';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (!['admin', 'teacher'].includes(formData.role)) return 'Role must be "admin" or "teacher"';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setLoading(true);
    setError('');
    try {
      await register(formData); // Uses context to register + auto-login
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      const message =
        err.response?.data?.message ||
        err.message ||
        'Registration failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Create Account</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 6 characters"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" value={formData.role} onChange={handleChange}>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  {loading ? 'Creating account...' : 'Register'}
                </Button>
              </Form>
              <div className="text-center mt-3">
                Already have an account?{' '}
                <a
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                  }}
                >
                  Sign in
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;