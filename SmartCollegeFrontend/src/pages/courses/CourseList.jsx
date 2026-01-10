// // src/pages/courses/CourseList.jsx
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

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     code: '',
//     departmentId: '',
//     duration: '8 Semesters',
//     status: 'Active',
//   });
//   const [submitting, setSubmitting] = useState(false);
//   const [filterDept, setFilterDept] = useState('');

//   // Fetch courses (optionally filtered)
//   const fetchCourses = async (deptId = '') => {
//     try {
//       const res = await axiosInstance.get(`/courses${deptId ? `?departmentId=${deptId}` : ''}`);
//       setCourses(res.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load courses');
//     }
//   };

//   // Fetch departments for dropdown & filtering
//   const fetchDepartments = async () => {
//     try {
//       const res = await axiosInstance.get('/departments');
//       setDepartments(res.data);
//     } catch (err) {
//       console.error(err);
//       // Non-fatal; user can still view courses
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//     fetchCourses(filterDept);
//     setLoading(false);
//   }, [filterDept]);

//   useEffect(() => {
//     if (departments.length > 0 && !formData.departmentId) {
//       setFormData((prev) => ({ ...prev, departmentId: departments[0]._id }));
//     }
//   }, [departments]);

//   // Helper: get department name by ID (with fallback)
//   const getDeptName = (deptObjOrId) => {
//     if (!deptObjOrId) return '—';

//     // If it's an object (populated), use .name
//     if (typeof deptObjOrId === 'object' && deptObjOrId.name) {
//       return deptObjOrId.name;
//     }

//     // If it's just an ID, find in departments array
//     const dept = departments.find((d) => d._id === deptObjOrId);
//     return dept ? dept.name : '—';
//   };

//   const handleNameChange = (e) => {
//     const name = e.target.value;
//     let newCode = '';

//     if (name.trim()) {
//       const prefix = name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase().padEnd(3, 'X');
//       if (prefix !== 'XXX') {
//         const existingCodes = courses
//           .filter(course => course.code && course.code.startsWith(prefix))
//           .map(course => {
//             const numPart = course.code.substring(3);
//             return parseInt(numPart, 10);
//           })
//           .filter(num => !isNaN(num));

//         const maxNum = existingCodes.length > 0 ? Math.max(...existingCodes) : 1000;
//         newCode = `${prefix}${maxNum + 1}`;
//       }
//     }

//     setFormData((prev) => ({
//       ...prev,
//       name,
//       code: newCode,
//     }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     if (!formData.name.trim() || !formData.code.trim() || !formData.departmentId) {
//       setError('Course name, code, and department are required');
//       return;
//     }

//     setSubmitting(true);
//     setError('');
//     try {
//       await axiosInstance.post('/courses', formData);
//       setFormData({
//         name: '',
//         code: '',
//         departmentId: departments.length ? departments[0]._id : '',
//         duration: '8 Semesters',
//         status: 'Active',
//       });
//       setShowModal(false);
//       fetchCourses(filterDept); // refresh
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || 'Failed to create course');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleFilterChange = (e) => {
//     const deptId = e.target.value;
//     setFilterDept(deptId);
//   };

//   return (
//     <Container fluid>
//       <Row className="mb-4">
//         <Col md={6}>
//           <h2>Courses</h2>
//         </Col>
//         <Col md={6} className="d-flex justify-content-md-end">
//           <Button variant="primary" onClick={() => setShowModal(true)}>
//             Add Course
//           </Button>
//         </Col>
//       </Row>

//       {/* Department Filter */}
//       <Row className="mb-4">
//         <Col md={4}>
//           <Form.Group>
//             <Form.Label>Filter by Department</Form.Label>
//             <Form.Select value={filterDept} onChange={handleFilterChange}>
//               <option value="">All Departments</option>
//               {departments.map((dept) => (
//                 <option key={dept._id} value={dept._id}>
//                   {dept.name}
//                 </option>
//               ))}
//             </Form.Select>
//           </Form.Group>
//         </Col>
//       </Row>

//       {error && <Alert variant="danger">{error}</Alert>}

//       {loading && courses.length === 0 ? (
//         <div className="text-center">Loading...</div>
//       ) : (
//         <Card>
//           <Card.Body>
//             <Table striped bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Code</th>
//                   <th>Department</th>
//                   <th>Created At</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {courses.length === 0 ? (
//                   <tr>
//                     <td colSpan="4" className="text-center">
//                       No courses found
//                     </td>
//                   </tr>
//                 ) : (
//                   courses.map((course) => (
//                     <tr key={course._id}>
//                       <td>{course.name}</td>
//                       <td>{course.code || '—'}</td>
//                       <td>{getDeptName(course.departmentId)}</td>
//                       <td>{new Date(course.createdAt).toLocaleDateString()}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </Table>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Add Course Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Course</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleCreate}>
//             <Form.Group className="mb-3">
//               <Form.Label>Course Name *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleNameChange}
//                 placeholder="e.g., Web Development"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Course Code *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="code"
//                 value={formData.code}
//                 disabled
//                 placeholder="Auto-generated"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Department *</Form.Label>
//               <Form.Select
//                 name="departmentId"
//                 value={formData.departmentId}
//                 onChange={handleInputChange}
//                 required
//               >
//                 {departments.map((dept) => (
//                   <option key={dept._id} value={dept._id}>
//                     {dept.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Duration</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="duration"
//                 value={formData.duration}
//                 onChange={handleInputChange}
//                 placeholder="e.g., 8 Semesters"
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
//               {submitting ? 'Creating...' : 'Create Course'}
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default CourseList; 


// src/pages/courses/CourseList.jsx
import React, { useState, useEffect } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from 'react-bootstrap';
import axiosInstance from '../../api/axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    departmentId: '',
    duration: '8 Semesters',
    status: 'Active',
  });
  const [submitting, setSubmitting] = useState(false);
  const [filterDept, setFilterDept] = useState('');

  // Fetch courses (optionally filtered)
  const fetchCourses = async (deptId = '') => {
    try {
      const res = await axiosInstance.get(`/courses${deptId ? `?departmentId=${deptId}` : ''}`);
      setCourses(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load courses');
    }
  };

  // Fetch departments for dropdown & filtering
  const fetchDepartments = async () => {
    try {
      const res = await axiosInstance.get('/departments');
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
      // Non-fatal; user can still view courses
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchDepartments();
      await fetchCourses(filterDept);
      setLoading(false);
    };
    loadData();
  }, [filterDept]);

  useEffect(() => {
    if (departments.length > 0 && !formData.departmentId) {
      setFormData((prev) => ({ ...prev, departmentId: departments[0]._id }));
    }
  }, [departments]);

  // Helper: get department NAME by ID or object (with fallback)
  const getDeptName = (deptObjOrId) => {
    if (!deptObjOrId) return '—';

    // If it's a populated object (from backend population)
    if (typeof deptObjOrId === 'object' && deptObjOrId.name) {
      return deptObjOrId.name;
    }

    // If it's just an ID string, look up in departments array
    const dept = departments.find((d) => d._id === deptObjOrId);
    return dept ? dept.name : '—';
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    let newCode = '';

    if (name.trim()) {
      const prefix = name.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase().padEnd(3, 'X');
      if (prefix !== 'XXX') {
        const existingCodes = courses
          .filter(course => course.code && course.code.startsWith(prefix))
          .map(course => {
            const numPart = course.code.substring(3);
            return parseInt(numPart, 10);
          })
          .filter(num => !isNaN(num));

        const maxNum = existingCodes.length > 0 ? Math.max(...existingCodes) : 1000;
        newCode = `${prefix}${maxNum + 1}`;
      }
    }

    setFormData((prev) => ({
      ...prev,
      name,
      code: newCode,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim() || !formData.departmentId) {
      setError('Course name, code, and department are required');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      await axiosInstance.post('/courses', formData);
      setFormData({
        name: '',
        code: '',
        departmentId: departments.length ? departments[0]._id : '',
        duration: '8 Semesters',
        status: 'Active',
      });
      setShowModal(false);
      fetchCourses(filterDept); // refresh
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create course');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFilterChange = (e) => {
    const deptId = e.target.value;
    setFilterDept(deptId);
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col md={6}>
          <h2>Courses</h2>
        </Col>
        <Col md={6} className="d-flex justify-content-md-end">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Course
          </Button>
        </Col>
      </Row>

      {/* Department Filter */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Filter by Department</Form.Label>
            <Form.Select value={filterDept} onChange={handleFilterChange}>
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading && courses.length === 0 ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Department</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No courses found
                    </td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr key={course._id}>
                      <td>{course.name}</td>
                      <td>{course.code || '—'}</td>
                      <td>{getDeptName(course.departmentId)}</td>
                      <td>{new Date(course.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* Add Course Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>Course Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g., Web Development"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course Code *</Form.Label>
              <Form.Control
                type="text"
                name="code"
                value={formData.code}
                disabled
                placeholder="Auto-generated"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Department *</Form.Label>
              <Form.Select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleInputChange}
                required
              >
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 8 Semesters"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create Course'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CourseList;