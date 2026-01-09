// src/pages/departments/AddDepartment.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import axiosInstance from '../../api/axios';

const AddDepartment = () => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    status: 'Active',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim()) {
      setError('Name and Code are required');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await axiosInstance.post('/departments', formData);
      navigate('/departments'); // go back to list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create department');
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
              <h2>Add New Department</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Department Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Code *</Form.Label>
                  <Form.Control
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="e.g., CSE"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Department'}
                </Button>
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => navigate('/departments')}
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

export default AddDepartment;