// // src/pages/auth/Login.jsx
// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../auth/AuthContext';
// import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) {
//       setError('Please enter both email and password');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     try {
//       await login(formData);
//       navigate('/dashboard');
//     } catch (err) {
//       console.error(err);
//       const message =
//         err.response?.data?.message ||
//         err.message ||
//         'Login failed. Please check your credentials.';
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
//               <h2 className="text-center mb-4">Sign In</h2>
//               {error && <Alert variant="danger">{error}</Alert>}
//               <Form onSubmit={handleSubmit}>
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
//                     placeholder="Enter your password"
//                     required
//                   />
//                 </Form.Group>

//                 <Button variant="primary" type="submit" className="w-100" disabled={loading}>
//                   {loading ? 'Signing in...' : 'Sign In'}
//                 </Button>
//               </Form>
//               <div className="text-center mt-3">
//                 Don’t have an account?{' '}
//                 <a
//                   href="/register"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     navigate('/register');
//                   }}
//                 >
//                   Register
//                 </a>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;




import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    }

    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ width: "360px" }}>
        <h4 className="text-center mb-3">Smart College Login</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
