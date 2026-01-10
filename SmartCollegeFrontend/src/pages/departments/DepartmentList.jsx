// // src/pages/departments/DepartmentList.jsx
// import React, { useState, useEffect } from 'react';
// import { Alert, Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
// import axiosInstance from '../../api/axios';

// const DepartmentList = () => {
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     code: '',
//     status: 'Active',
//   });
//   const [submitting, setSubmitting] = useState(false);

//   // Fetch departments
//   const fetchDepartments = async () => {
//     try {
//       const res = await axiosInstance.get('/departments');
//       setDepartments(res.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load departments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     if (!formData.name.trim() || !formData.code.trim()) {
//       setError('Name and Code are required');
//       return;
//     }

//     setSubmitting(true);
//     setError('');
//     try {
//       await axiosInstance.post('/departments', formData);
//       setFormData({ name: '', code: '', status: 'Active' });
//       setShowModal(false);
//       fetchDepartments(); // refresh list
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || 'Failed to create department');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Container fluid>
//       <Row className="mb-4">
//         <Col>
//           <h2>Departments</h2>
//           <Button variant="primary" onClick={() => setShowModal(true)}>
//             Add Department
//           </Button>
//         </Col>
//       </Row>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {loading ? (
//         <div className="text-center">Loading...</div>
//       ) : (
//         <Card>
//           <Card.Body>
//             <Table striped bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Code</th>
//                   <th>Status</th>
//                   <th>Created At</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {departments.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="text-center">
//                       No departments found
//                     </td>
//                   </tr>
//                 ) : (
//                   departments.map((dept) => (
//                     <tr key={dept._id}>
//                       <td>{dept.name}</td>
//                       <td>{dept.code}</td>
//                       <td>{dept.status}</td>
//                       <td>{new Date(dept.createdAt).toLocaleDateString()}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </Table>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Add Department Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Department</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleCreate}>
//             <Form.Group className="mb-3">
//               <Form.Label>Name *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 placeholder="e.g., Computer Science"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Code *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="code"
//                 value={formData.code}
//                 onChange={handleInputChange}
//                 placeholder="e.g., CSE"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Status</Form.Label>
//               <Form.Select name="status" value={formData.status} onChange={handleInputChange}>
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </Form.Select>
//             </Form.Group>

//             <Button variant="primary" type="submit" disabled={submitting}>
//               {submitting ? 'Creating...' : 'Create'}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default DepartmentList;


// // src/pages/departments/DepartmentList.jsx
// import React, { useState, useEffect } from 'react';
// import { Alert, Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
// import axiosInstance from '../../api/axios';

// const DepartmentList = () => {
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     code: '',
//     status: 'Active',
//   });
//   const [submitting, setSubmitting] = useState(false);

//   // Fetch departments
//   const fetchDepartments = async () => {
//     try {
//       const res = await axiosInstance.get('/departments');
//       setDepartments(res.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load departments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   // Helper: Extract first 3 letters (alphanumeric only), uppercase, pad to 3
//   const getPrefix = (name) => {
//     return name
//       .replace(/[^a-zA-Z]/g, '') // Remove non-alphabet characters
//       .substring(0, 3)
//       .toUpperCase()
//       .padEnd(3, 'X'); // e.g., "IT" → "ITX"
//   };

//   // Helper: Generate next available numeric suffix for a given prefix
//   const generateNextCode = (prefix) => {
//     const existingCodes = departments
//       .filter(dept => dept.code && dept.code.startsWith(prefix))
//       .map(dept => {
//         const numPart = dept.code.substring(3);
//         return parseInt(numPart, 10);
//       })
//       .filter(num => !isNaN(num));

//     const maxNum = existingCodes.length > 0 ? Math.max(...existingCodes) : 1000;
//     return `${prefix}${maxNum + 1}`;
//   };

//   // Handle department name input with auto-code generation
//   const handleNameChange = (e) => {
//     const name = e.target.value;
//     let newCode = '';

//     if (name.trim()) {
//       const prefix = getPrefix(name);
//       if (prefix !== 'XXX') {
//         newCode = generateNextCode(prefix);
//       }
//     }

//     // Update both name and code (code is cleared if name is empty)
//     setFormData((prev) => ({
//       ...prev,
//       name,
//       code: newCode,
//     }));
//   };

//   const handleStatusChange = (e) => {
//     setFormData((prev) => ({ ...prev, status: e.target.value }));
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     if (!formData.name.trim() || !formData.code.trim()) {
//       setError('Name and Code are required');
//       return;
//     }

//     setSubmitting(true);
//     setError('');
//     try {
//       await axiosInstance.post('/departments', formData);
//       setFormData({ name: '', code: '', status: 'Active' });
//       setShowModal(false);
//       fetchDepartments(); // refresh list
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || 'Failed to create department');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Container fluid>
//       <Row className="mb-4">
//         <Col>
//           <h2>Departments</h2>
//           <Button variant="primary" onClick={() => setShowModal(true)}>
//             Add Department
//           </Button>
//         </Col>
//       </Row>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {loading ? (
//         <div className="text-center">Loading...</div>
//       ) : (
//         <Card>
//           <Card.Body>
//             <Table striped bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Code</th>
//                   <th>Status</th>
//                   <th>Created At</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {departments.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="text-center">
//                       No departments found
//                     </td>
//                   </tr>
//                 ) : (
//                   departments.map((dept) => (
//                     <tr key={dept._id}>
//                       <td>{dept.name}</td>
//                       <td>{dept.code}</td>
//                       <td>{dept.status}</td>
//                       <td>{new Date(dept.createdAt).toLocaleDateString()}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </Table>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Add Department Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Department</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleCreate}>
//             <Form.Group className="mb-3">
//               <Form.Label>Name *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleNameChange} // 👈 Special handler for auto-code
//                 placeholder="e.g., Computer Science"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Code *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="code"
//                 value={formData.code}
//                 disabled // 👈 Disabled: auto-generated only
//                 placeholder="Auto-generated"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Status</Form.Label>
//               <Form.Select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleStatusChange}
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </Form.Select>
//             </Form.Group>

//             <Button variant="primary" type="submit" disabled={submitting}>
//               {submitting ? 'Creating...' : 'Create'}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default DepartmentList;








import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function DepartmentList() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api.get("/departments").then((res) => setDepartments(res.data));
  }, []);

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h5>Departments</h5>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td>{d.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
