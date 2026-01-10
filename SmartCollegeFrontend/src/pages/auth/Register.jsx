// // src/pages/auth/Register.jsx
// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../auth/AuthContext';
// import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'teacher', // default role
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { register } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     if (!formData.name.trim()) return 'Name is required';
//     if (!/^\S+@\S+\.\S+$/.test(formData.email)) return 'Valid email is required';
//     if (formData.password.length < 6) return 'Password must be at least 6 characters';
//     if (!['admin', 'teacher'].includes(formData.role)) return 'Role must be "admin" or "teacher"';
//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errorMsg = validate();
//     if (errorMsg) {
//       setError(errorMsg);
//       return;
//     }

//     setLoading(true);
//     setError('');
//     try {
//       await register(formData); // Uses context to register + auto-login
//       navigate('/dashboard');
//     } catch (err) {
//       console.error(err);
//       const message =
//         err.response?.data?.message ||
//         err.message ||
//         'Registration failed. Please try again.';
//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
//       <Row className="w-100">
//         <Col md={{ span: 6, offset: 3 }}>
//           <Card>
//             <Card.Body>
//               <h2 className="text-center mb-4">Create Account</h2>
//               {error && <Alert variant="danger">{error}</Alert>}
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="name">
//                   <Form.Label>Full Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Enter your full name"
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="email">
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="name@example.com"
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="password">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="At least 6 characters"
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="role">
//                   <Form.Label>Role</Form.Label>
//                   <Form.Select name="role" value={formData.role} onChange={handleChange}>
//                     <option value="teacher">Teacher</option>
//                     <option value="admin">Admin</option>
//                   </Form.Select>
//                 </Form.Group>

//                 <Button variant="primary" type="submit" className="w-100" disabled={loading}>
//                   {loading ? 'Creating account...' : 'Register'}
//                 </Button>
//               </Form>
//               <div className="text-center mt-3">
//                 Already have an account?{' '}
//                 <a
//                   href="/login"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     navigate('/login');
//                   }}
//                 >
//                   Sign in
//                 </a>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Register;









import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", form);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ width: "380px" }}>
        <h4 className="text-center mb-3">Create Account</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label>Name</label>
            <input
              className="form-control"
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label>Role</label>
            <select
              className="form-select"
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
          </div>

          <button
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
